using Ardalis.Specification;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Admin;

namespace Backend.Services.Specifications;

public class AdminStatsSpecification : Specification<Ticket>
{
    public AdminStatsSpecification(AdminStatsFilterDto filter)
    {
        Query
            .Include(t => t.Booking)
            .ThenInclude(b => b.Session)
            .ThenInclude(s => s.Movie)
            .ThenInclude(m => m.MovieGenres)
            .ThenInclude(mg => mg.Genre)
            .Include(t => t.Seat)
            .Include(t => t.Discount)
            .Where(t => t.Booking.Status == BookingStatus.CONFIRMED);

        if (filter.FromDate.HasValue)
            Query.Where(t => t.Booking.BookingTime >= filter.FromDate.Value);

        if (filter.ToDate.HasValue)
            Query.Where(t => t.Booking.BookingTime <= filter.ToDate.Value);

        if (filter.MovieId.HasValue)
            Query.Where(t => t.Booking.Session.MovieId == filter.MovieId.Value);

        if (filter.SessionId.HasValue)
            Query.Where(t => t.Booking.SessionId == filter.SessionId.Value);

        if (filter.GenreId.HasValue)
            Query.Where(t => t.Booking.Session.Movie.MovieGenres.Any(mg => mg.GenreId == filter.GenreId.Value));

        if (filter.SessionId.HasValue)
            Query.Where(t => t.Booking.SessionId == filter.SessionId.Value);

        if (filter.GenreId.HasValue)
            Query.Where(t => t.Booking.Session.Movie.MovieGenres.Any(mg => mg.GenreId == filter.GenreId.Value));

        if (filter.HallId.HasValue)
            Query.Where(t => t.Booking.Session.HallId == filter.HallId.Value);
    }
}