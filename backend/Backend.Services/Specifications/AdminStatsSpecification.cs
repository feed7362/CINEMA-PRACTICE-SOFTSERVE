using Ardalis.Specification;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Admin;

namespace Backend.Services.Specifications;

public class AdminStatsSpecification : Specification<Ticket>
{
    // Додали необов'язкові параметри (movieId, sessionId, hallId) в конструктор
    public AdminStatsSpecification(
        AdminStatsFilterDto filter, 
        int? movieId = null, 
        int? sessionId = null, 
        int? hallId = null)
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

        // --- Фільтри з DTO ---
        if (filter.DateFrom.HasValue)
            Query.Where(t => t.Booking.BookingTime >= filter.DateFrom.Value);

        if (filter.DateTo.HasValue)
            Query.Where(t => t.Booking.BookingTime <= filter.DateTo.Value);

        if (filter.GenreId.HasValue)
            Query.Where(t => t.Booking.Session.Movie.MovieGenres.Any(mg => mg.GenreId == filter.GenreId.Value));

        if (!string.IsNullOrEmpty(filter.Director))
            Query.Where(t => t.Booking.Session.Movie.Director.Contains(filter.Director));

        if (!string.IsNullOrEmpty(filter.Country))
            Query.Where(t => t.Booking.Session.Movie.Country.Contains(filter.Country));

        if (filter.MinIMDBRating.HasValue)
            Query.Where(t => t.Booking.Session.Movie.IMDBRating >= filter.MinIMDBRating.Value);
            
        if (filter.AgeRatingValue.HasValue)
            Query.Where(t => (int)t.Booking.Session.Movie.AgeRating == filter.AgeRatingValue.Value);

        // --- Технічні ID (передані окремо) ---
        if (movieId.HasValue)
            Query.Where(t => t.Booking.Session.MovieId == movieId.Value);

        if (sessionId.HasValue)
            Query.Where(t => t.Booking.SessionId == sessionId.Value);

        if (hallId.HasValue)
            Query.Where(t => t.Booking.Session.HallId == hallId.Value);
    }
}
