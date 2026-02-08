using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs;
using Backend.Services.DTOs.Booking;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Stripe;
using System.Data;

namespace Backend.Services.Services;

public class BookingService(
    IRepository<Booking> bookingRepository,
    IRepository<Session> sessionRepository,
    IRepository<Seat> seatRepository,
    IRepository<Domain.Entities.Discount> discountRepository,
    IRepository<Ticket> ticketRepository,
    IMapper mapper
    )
    : IBookingService
{
    public async Task<BookingResponseDto> LockBookingAsync(
            CreateBookingDto dto, 
            int userId
        )
    {
        // Start Transaction with SERIALIZABLE isolation
        await using var transaction = await bookingRepository
            .BeginTransactionAsync(IsolationLevel.Serializable);

        try
        {
            var activeTickets = await ticketRepository.GetListBySpecAsync(
                new ActiveTicketsForSeatsBySessionIdSpec(
                    dto.SessionId, 
                    dto.SeatIds)
                );

            if (activeTickets.Count != 0)
            {
                throw new BookingConflictException(
                    "Одне або декілька місць уже зайняті."
                );
            }

            var booking = await CreateBookingEntityInternalAsync(dto, userId);

            bookingRepository.Insert(booking);
            await bookingRepository.SaveChangesAsync();

            var totalAmount = (long)(booking
                .Tickets.Sum(t => t.FinalPrice) * 100);

            var options = new PaymentIntentCreateOptions
            {
                Amount = totalAmount,
                Currency = "uah",
                PaymentMethodTypes = ["card"],
                Metadata = new Dictionary<string, string> { { 
                        "BookingId", booking.Id.ToString() 
                    } }
            };

            var intent = await new PaymentIntentService()
                .CreateAsync(options);

            // Update the entity with the Stripe ID
            booking.PaymentIntentId = intent.Id;
            await bookingRepository.SaveChangesAsync();

            // Commit
            await transaction.CommitAsync();

            return mapper.Map<BookingResponseDto>(booking) with
            {
                ClientSecret = intent.ClientSecret,
                PaymentIntentId = intent.Id
            };
        }
        catch (DbUpdateException ex) 
        when (ex.InnerException is PostgresException { SqlState: "40001" })
        {
            await transaction.RollbackAsync();
            throw new BookingConflictException("Конфлікт паралелізму. Спробуйте ще раз.");
        }
        catch (InvalidOperationException)
        {
            await transaction.RollbackAsync();
            throw;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<BookingResponseDto> ConfirmBookingAsync(
            ConfirmBookingRequestDto dto, 
            int userId
        )
    {
        var booking = await bookingRepository.GetFirstBySpecAsync(
            new BookingWithDetailsByIdSpec(dto.BookingId, userId));

        if (booking == null)
            throw new EntityNotFoundException(
                nameof(Booking), dto.BookingId
            );

        var isExpired = booking.Status == BookingStatus.CANCELED 
                        || booking.ExpirationTime < DateTime.UtcNow;

        var intentService = new PaymentIntentService();
        var intent = await intentService.GetAsync(booking.PaymentIntentId);

        if (intent.Status != "succeeded")
        {
            throw new BadRequestException("Оплата не була успішною.");
        }

        if (isExpired)
        {
            var refundOptions = new RefundCreateOptions { 
                PaymentIntent = booking.PaymentIntentId 
            };

            var refundService = new RefundService();
            await refundService.CreateAsync(refundOptions);

            throw new BookingConflictException("Час вашого бронювання " +
                "закінчився.Здійснено повне повернення коштів.");
        }

        booking.Status = BookingStatus.CONFIRMED;
        booking.ConfirmationTime = DateTime.UtcNow;
        await bookingRepository.UpdateAsync(booking);
        var clientSecret = intent.ClientSecret;


        return mapper.Map<BookingResponseDto>(booking) with
        {
            ClientSecret = clientSecret,
            PaymentIntentId = intent.Id
        };
    }

    private async Task<Booking> CreateBookingEntityInternalAsync(
    CreateBookingDto dto,
    int userId)
    {
        // 1. Завантажуємо сеанс із цінами
        var session = await sessionRepository.GetFirstBySpecAsync(
            new SessionWithPricesByIdSpec(dto.SessionId));

        if (session == null)
            throw new EntityNotFoundException(nameof(Session), dto.SessionId);

        if (session.StartTime < DateTime.UtcNow)
            throw new BadRequestException("Неможливо забронювати квитки на сеанс, що минув.");

        // 2. Завантажуємо місця
        var seats = await seatRepository.GetListBySpecAsync(
            new SeatsByListIdsSpec(dto.SeatIds));

        if (seats.Count != dto.SeatIds.Count)
            throw new BadRequestException("Одне або декілька місць не знайдено.");

        Backend.Domain.Entities.Discount selectedDiscount;
        if (!string.IsNullOrEmpty(dto.Promocode))
        {
            var promo = await discountRepository.GetFirstBySpecAsync(
                new DiscountByCodeSpec(dto.Promocode));

            if (promo == null || !promo.IsActive || (promo.ExpiryDate < DateTime.UtcNow))
                throw new BadRequestException("Промокод недійсний або прострочений.");

            selectedDiscount = promo;
        }
        else
        {
            selectedDiscount = await discountRepository.GetFirstBySpecAsync(
                new DiscountByTypeSpec(DiscountType.REGULAR))
                ?? throw new BookingConflictException("Системна помилка: Базову знижку не знайдено.");
        }

        var booking = new Booking
        {
            ApplicationUserId = userId,
            SessionId = dto.SessionId,
            BookingTime = DateTime.UtcNow,
            ExpirationTime = DateTime.UtcNow.AddMinutes(15),
            Status = BookingStatus.PENDING
        };

        foreach (var seat in seats)
        {
            var priceEntry = session.Prices.FirstOrDefault(p => p.SeatType == seat.SeatType)
                ?? throw new BadRequestException($"Відсутня ціна для типу місця {seat.SeatType}");

            decimal finalPrice = priceEntry.Value * (1 - (decimal)selectedDiscount.Percentage / 100);

            booking.Tickets.Add(new Ticket
            {
                SeatId = seat.Id,
                PriceId = priceEntry.Id,
                DiscountId = selectedDiscount.Id,
                FinalPrice = finalPrice,
                PurchaseTime = DateTime.UtcNow
            });
        }

        return booking;
    }

    public async Task<BookingResponseDto> ApplyPromocodeAsync(
    int bookingId,
    string code,
    int userId)
    {
        await using var transaction = await bookingRepository.BeginTransactionAsync(IsolationLevel.Serializable);

        try
        {
            var booking = await bookingRepository.GetFirstBySpecAsync(
                new BookingWithDetailsByIdSpec(bookingId, userId));

            if (booking == null) throw new EntityNotFoundException(nameof(Booking), bookingId);

            if (booking.Status != BookingStatus.PENDING)
                throw new ConflictException("Промокод можна застосувати тільки до бронювання у статусі PENDING.");

            var discount = await discountRepository.GetFirstBySpecAsync(new DiscountByCodeSpec(code));

            if (discount == null || !discount.IsActive || (discount.ExpiryDate < DateTime.UtcNow))
                throw new BadRequestException("Промокод недійсний, неактивний або термін його дії закінчився.");

            foreach (var ticket in booking.Tickets)
            {
                var basePrice = ticket.Price.Value;

                ticket.DiscountId = discount.Id;

                var discountedPrice = basePrice * (1 - (decimal)discount.Percentage / 100);
                ticket.FinalPrice = Math.Round(discountedPrice, 2);
            }

            await bookingRepository.SaveChangesAsync();

            var totalAmountInCents = (long)Math.Round(booking.Tickets.Sum(t => t.FinalPrice) * 100, 0);

            var service = new PaymentIntentService();
            await service.UpdateAsync(booking.PaymentIntentId, new PaymentIntentUpdateOptions
            {
                Amount = totalAmountInCents
            });

            await transaction.CommitAsync();

            var response = mapper.Map<BookingResponseDto>(booking);

            var intent = await service.GetAsync(booking.PaymentIntentId);
            return response with {
                ClientSecret = intent.ClientSecret,
                AppliedPromoCode = discount.Code
            };
        }
        catch (StripeException ex)
        {
            await transaction.RollbackAsync();
            throw new BadRequestException($"Помилка Stripe при оновленні суми: {ex.Message}");
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<BookingResponseDto?> GetBookingByIdAsync(
            int bookingId, 
            int userId
        )
    {
        var booking = await bookingRepository.GetFirstBySpecAsync(
        new BookingByIdAndUserId(bookingId, userId));

        if (booking == null) return null;

        var response = mapper.Map<BookingResponseDto>(booking);

        if (booking.Status == BookingStatus.PENDING && !string.IsNullOrEmpty(booking.PaymentIntentId))
        {
            try
            {
                var service = new PaymentIntentService();
                var intent = await service.GetAsync(booking.PaymentIntentId);

                return response with { ClientSecret = intent.ClientSecret };
            }
            catch (StripeException)
            {
                return response;
            }
        }

        return response;
    }

    public async Task<PagedResponse<BookingSummaryResponseDto>> GetUserBookingHistoryAsync(
            int userId, 
            int page, 
            int pageSize
        )
    {
        var filterSpec = new BookingsByUserIdSpec(userId);

        var totalCount = await bookingRepository.CountAsync(filterSpec);

        var pagedSpec = new BookingsByUserIdPagedSpec(userId, page, pageSize);
        var bookings = await bookingRepository.GetListBySpecAsync(pagedSpec);

        var items = mapper.Map<List<BookingSummaryResponseDto>>(bookings);

        return new PagedResponse<BookingSummaryResponseDto>(
                items, 
                totalCount, 
                page, 
                pageSize
            );
    }

    public async Task<BookingDetailResponseDto?> GetBookingDetailsByIdAsync(
            int bookingId, 
            int userId
        )
    {
        var booking = await bookingRepository.GetFirstBySpecAsync(
                new BookingWithDetailsByIdSpec(bookingId, userId)
            );

        if (booking == null) return null;

        var response = mapper.Map<BookingDetailResponseDto>(booking);

        if (booking.Status != BookingStatus.PENDING 
            || string.IsNullOrEmpty(booking.PaymentIntentId))
        {
            try
            {
                var service = new PaymentIntentService();
                var intent = await service.GetAsync(booking.PaymentIntentId);

                return response with { ClientSecret = intent.ClientSecret };
            }
            catch (StripeException)
            {
                return response;
            }
        }

        return response;
    }

    public async Task<RefundResponseDto> RefundBookingAsync(int bookingId, int userId)
    {
        var booking = await bookingRepository.GetFirstBySpecAsync(
            new BookingWithDetailsByIdSpec(bookingId, userId));

        if (booking == null)
            throw new EntityNotFoundException(nameof(Booking), bookingId);

        if (booking.Status == BookingStatus.CANCELED)
            throw new ConflictException("Це бронювання вже було скасовано.");

        if (string.IsNullOrEmpty(booking.PaymentIntentId))
            throw new ConflictException("Платіж не знайдено. Повернення неможливе.");

        try
        {
            var refundService = new RefundService();
            var refund = await refundService.CreateAsync(new RefundCreateOptions
            {
                PaymentIntent = booking.PaymentIntentId
            });

            booking.Status = BookingStatus.CANCELED;
            await bookingRepository.UpdateAsync(booking);

            return new RefundResponseDto(
                booking.Id,
                booking.Status.ToString(),
                refund.Id,
                (decimal)refund.Amount / 100,
                DateTime.UtcNow
            );
        }
        catch (StripeException ex)
        {
            throw new ConflictException($"Stripe заблокував повернення: " +
                $"{ex.Message}");
        }
    }
}