using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs;
using Backend.Services.DTOs.Booking;
using Backend.Services.Specifications;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Stripe;
using System.Data;
using Backend.Services.Interfaces;

namespace Backend.Services.Services;

public class BookingService(
    IRepository<Booking> bookingRepository,
    IRepository<Session> sessionRepository,
    IRepository<Seat> seatRepository,
    IRepository<Domain.Entities.Discount> discountRepository,
    IRepository<Ticket> ticketRepository)
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
                throw new InvalidOperationException(
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

            return new BookingResponseDto(
                booking.Id,
                booking.ApplicationUserId,
                booking.SessionId,
                booking.BookingTime,
                booking.ExpirationTime,
                booking.Status.ToString(),
                intent.ClientSecret,
                intent.Id
            );
        }
        catch (DbUpdateException ex) 
            when (ex.InnerException is PostgresException { SqlState: "40001" })
        {
            await transaction.RollbackAsync();
            throw new Exception(
                "Конфлікт паралелізму: місця були змінені іншою " +
                "транзакцією. Будь ласка, спробуйте ще раз.");
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
            ConfirmBookingDto dto, 
            int userId
        )
    {
        var booking = await bookingRepository.GetFirstBySpecAsync(
            new BookingWithDetailsByIdSpec(dto.BookingId, userId));

        if (booking == null)
            throw new KeyNotFoundException(
                    $"Бронювання {dto.BookingId} не знайдено."
                );

        var isExpired = booking.Status == BookingStatus.CANCELED 
                        || booking.ExpirationTime < DateTime.UtcNow;

        var intentService = new PaymentIntentService();
        var intent = await intentService.GetAsync(booking.PaymentIntentId);

        if (intent.Status != "succeeded")
        {
            throw new InvalidOperationException("Оплата не була успішною.");
        }

        if (isExpired)
        {
            var refundOptions = new RefundCreateOptions { 
                PaymentIntent = booking.PaymentIntentId 
            };

            var refundService = new RefundService();
            await refundService.CreateAsync(refundOptions);

            throw new InvalidOperationException(
                "Час вашого бронювання закінчився до завершення " +
                "оплати. Здійснено повне повернення коштів.");
        }

        booking.Status = BookingStatus.CONFIRMED;
        booking.ConfirmationTime = DateTime.UtcNow;
        await bookingRepository.UpdateAsync(booking);
        var clientSecret = intent.ClientSecret;

        return new BookingResponseDto(
            booking.Id,
            booking.ApplicationUserId,
            booking.SessionId,
            booking.BookingTime,
            booking.ExpirationTime,
            booking.Status.ToString(),
            clientSecret,
            booking.PaymentIntentId
        );
    }

    private async Task<Booking> CreateBookingEntityInternalAsync(
            CreateBookingDto dto, 
            int userId
        )
    {
        var session = await sessionRepository.GetFirstBySpecAsync(
                new SessionWithPricesByIdSpec(dto.SessionId)
            );
        if (session == null) throw new Exception("Сеанс не знайдено.");

        var seats = await seatRepository.GetListBySpecAsync(
                new SeatsByListIdsSpec(dto.SeatIds)
            );
        if (seats.Count != dto.SeatIds.Count) 
            throw new Exception("Одне або декілька місць не знайдено.");

        if (session.StartTime < DateTime.UtcNow)
        {
            throw new InvalidOperationException("Неможливо забронювати квитки на " +
                "                           сеанс, який уже розпочався або пройшов.");
        }

        var regularDiscount =
            await discountRepository.GetFirstBySpecAsync(
                    new DiscountByTypeSpec(DiscountType.REGULAR)
                );
        if (regularDiscount == null) throw new Exception(
                "Базову знижку 'REGULAR' не знайдено в системі."
            );

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
            var priceEntry = session.Prices.FirstOrDefault(
                    p => p.SeatType == seat.SeatType
                );
            if (priceEntry == null) throw new Exception(
                    $"Відсутня ціна для типу місця {seat.SeatType}"
                );

            booking.Tickets.Add(new Ticket
            {
                SeatId = seat.Id,
                PriceId = priceEntry.Id,
                DiscountId = regularDiscount.Id,
                FinalPrice = priceEntry.Value,
                PurchaseTime = DateTime.UtcNow
            });
        }

        return booking;
    }

    public async Task<BookingResponseDto?> GetBookingByIdAsync(
            int bookingId, 
            int userId
        )
    {
        var booking = await bookingRepository.GetFirstBySpecAsync(
            new BookingByIdAndUserId(bookingId, userId));

        if (booking == null) return null;

        string? clientSecret = null;

        if (booking.Status != BookingStatus.PENDING 
            || string.IsNullOrEmpty(booking.PaymentIntentId))
            return new BookingResponseDto(
                booking.Id,
                booking.ApplicationUserId,
                booking.SessionId,
                booking.BookingTime,
                booking.ExpirationTime,
                booking.Status.ToString(),
                clientSecret,
                booking.PaymentIntentId
            );


        var service = new PaymentIntentService();
        var intent = await service.GetAsync(booking.PaymentIntentId);
        clientSecret = intent.ClientSecret;

        return new BookingResponseDto(
            booking.Id,
            booking.ApplicationUserId,
            booking.SessionId,
            booking.BookingTime,
            booking.ExpirationTime,
            booking.Status.ToString(),
            clientSecret,
            booking.PaymentIntentId
        );
    }

    public async Task<PagedResponse<BookingSummaryDto>> GetUserBookingHistoryAsync(
            int userId, 
            int page, 
            int pageSize
        )
    {
        var filterSpec = new BookingsByUserIdSpec(userId);

        var totalCount = await bookingRepository.CountAsync(filterSpec);

        var pagedSpec = new BookingsByUserIdPagedSpec(userId, page, pageSize);
        var bookings = await bookingRepository.GetListBySpecAsync(pagedSpec);

        var items = bookings.Select(b => new BookingSummaryDto(
            b.Id,
            b.Session.Movie.TitleUkr,
            b.Session.StartTime,
            b.BookingTime,
            b.Tickets.Count,
            b.Tickets.Sum(t => t.FinalPrice),
            b.Status.ToString()
        )).ToList();

        return new PagedResponse<BookingSummaryDto>(
                items, 
                totalCount, 
                page, 
                pageSize
            );
    }

    public async Task<BookingDetailDto?> GetBookingDetailsByIdAsync(
            int bookingId, 
            int userId
        )
    {
        var booking = await bookingRepository.GetFirstBySpecAsync(
                new BookingWithDetailsByIdSpec(bookingId, userId)
            );

        if (booking == null) return null;

        string? clientSecret = null;

        if (booking.Status != BookingStatus.PENDING 
            || string.IsNullOrEmpty(booking.PaymentIntentId))
            return new BookingDetailDto(
                booking.Id,
                booking.BookingTime,
                booking.ExpirationTime,
                booking.Status.ToString(),
                booking.Tickets.Sum(t => t.FinalPrice),
                new SessionShortDto(
                    booking.Session.Id,
                    booking.Session.Movie.TitleUkr,
                    booking.Session.Hall.Name,
                    booking.Session.StartTime
                ),
                booking.Tickets.Select(t => new TicketDetailDto(
                    t.Id,
                    t.Seat.RowNumber,
                    t.Seat.SeatNumber,
                    t.Seat.SeatType.ToString(),
                    t.FinalPrice,
                    t.Discount?.Type.ToString() ?? "ВІДСУТНЯ"
                )).ToList(),
                booking.PaymentIntentId,
                clientSecret
            );

        var service = new PaymentIntentService();
        var intent = await service.GetAsync(booking.PaymentIntentId);
        clientSecret = intent.ClientSecret;

        return new BookingDetailDto(
            booking.Id,
            booking.BookingTime,
            booking.ExpirationTime,
            booking.Status.ToString(),
            booking.Tickets.Sum(t => t.FinalPrice),
            new SessionShortDto(
                booking.Session.Id,
                booking.Session.Movie.TitleUkr,
                booking.Session.Hall.Name,
                booking.Session.StartTime
            ),
            booking.Tickets.Select(t => new TicketDetailDto(
                t.Id,
                t.Seat.RowNumber,
                t.Seat.SeatNumber,
                t.Seat.SeatType.ToString(),
                t.FinalPrice,
                t.Discount?.Type.ToString() ?? "ВІДСУТНЯ"
            )).ToList(),
            booking.PaymentIntentId,
            clientSecret
        );
    }

    public async Task<RefundResponseDto> RefundBookingAsync(int bookingId, int userId)
    {
        var booking = await bookingRepository.GetFirstBySpecAsync(
            new BookingWithDetailsByIdSpec(bookingId, userId));

        if (booking == null) throw new KeyNotFoundException("Бронювання не знайдено.");

        if (booking.Status == BookingStatus.CANCELED)
            throw new InvalidOperationException("Це бронювання вже було повернуто.");

        if (string.IsNullOrEmpty(booking.PaymentIntentId))
        {
            throw new InvalidOperationException("Це бронювання не має пов'язаного платежу для повернення.");
        }

        var refundOptions = new RefundCreateOptions
        {
            PaymentIntent = booking.PaymentIntentId
        };

        var refundService = new RefundService();

        try
        {
            var refund = await refundService.CreateAsync(refundOptions);

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
            throw new InvalidOperationException($"Помилка Stripe: {ex.Message}");
        }
    }
}