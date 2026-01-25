using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Booking;
using static Backend.Services.Specifications.Booking;

namespace Backend.Services.Services;

public class BookingService : IBookingService
{
    private readonly IRepository<Booking> _bookingRepository;
    private readonly IRepository<Session> _sessionRepository;
    private readonly IRepository<Seat> _seatRepository;
    private readonly IRepository<Discount> _discountRepository;

    public BookingService(
        IRepository<Booking> bookingRepository,
        IRepository<Session> sessionRepository,
        IRepository<Seat> seatRepository,
        IRepository<Discount> discountRepository
        )
    {
        _bookingRepository = bookingRepository;
        _sessionRepository = sessionRepository;
        _seatRepository = seatRepository;
        _discountRepository = discountRepository;
    }

    public async Task<BookingResponseDto> CreateBookingAsync(CreateBookingDto dto, int userId)
    {
        var session = await _sessionRepository.GetFirstBySpecAsync(new SessionWithPricesByIdSpec(dto.SessionId));
        if (session == null) throw new Exception("Session not found.");

        var seats = await _seatRepository.GetListBySpecAsync(new SeatsByListIdsSpec(dto.SeatIds));
        if (seats.Count != dto.SeatIds.Count) throw new Exception("One or more seats not found.");

        var regularDiscount = await _discountRepository.GetFirstBySpecAsync(new DiscountByTypeSpec(DiscountType.REGULAR));
        if (regularDiscount == null) throw new Exception("Base 'REGULAR' discount not found in system.");

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
            var priceEntry = session.Prices.FirstOrDefault(p => p.SeatType == seat.SeatType);
            if (priceEntry == null) throw new Exception($"Missing price for {seat.SeatType}");

            booking.Tickets.Add(new Ticket
            {
                SeatId = seat.Id,
                PriceId = priceEntry.Id,
                DiscountId = regularDiscount.Id,
                FinalPrice = priceEntry.Value,
                PurchaseTime = DateTime.UtcNow
            });
        }

        await _bookingRepository.AddAsync(booking);
        await _bookingRepository.SaveChangesAsync();

        return new BookingResponseDto(
            booking.Id,
            booking.ApplicationUserId,
            booking.SessionId,
            booking.BookingTime,
            booking.Status.ToString()
        );
    }
    public async Task<BookingResponseDto?> GetBookingByIdAsync(int bookingId, int userId)
    {

        var result = await _bookingRepository.GetFirstBySpecAsync(new BookingByUserIdAndUserId(bookingId, userId));
        await _bookingRepository.SaveChangesAsync();

        if (result == null) return null;

        return new BookingResponseDto(
            result.Id,
            result.ApplicationUserId,
            result.SessionId,
            result.BookingTime,
            result.Status.ToString()
        );
    }

    public async Task<PagedResponse<BookingSummaryDto>> GetUserBookingHistoryAsync(int userId, int page, int pageSize)
    {
        var filterSpec = new UserBookingHistorySpec(userId);

        int totalCount = await _bookingRepository.CountAsync(filterSpec);

        var pagedSpec = new UserBookingPagedSpec(userId, page, pageSize);
        var bookings = await _bookingRepository.GetListBySpecAsync(pagedSpec);

        var items = bookings.Select(b => new BookingSummaryDto(
            b.Id,
            b.Session.Movie.TitleUKR,
            b.Session.StartTime,
            b.Tickets.Count,
            b.Tickets.Sum(t => t.FinalPrice),
            b.Status.ToString()
        )).ToList();

        return new PagedResponse<BookingSummaryDto>(items, totalCount, page, pageSize);
    }

    public async Task<BookingDetailDto?> GetBookingDetailsByIdAsync(int bookingId, int userId)
    {
        var booking = await _bookingRepository.GetFirstBySpecAsync(new BookingWithDetailsByIdSpec(bookingId, userId));

        if (booking == null) return null;

        return new BookingDetailDto(
            booking.Id,
            booking.BookingTime,
            booking.ExpirationTime,
            booking.Status.ToString(),
            booking.Tickets.Sum(t => t.FinalPrice),
            new SessionShortDto(
                booking.Session.Id,
                booking.Session.Movie.TitleUKR,
                booking.Session.Hall.Name,
                booking.Session.StartTime
            ),
            booking.Tickets.Select(t => new TicketDetailDto(
                t.Id,
                t.Seat.RowNumber,
                t.Seat.SeatNumber,
                t.Seat.SeatType.ToString(),
                t.FinalPrice,
                t.Discount?.Type.ToString() ?? "NONE"
            )).ToList()
        );
    }
}