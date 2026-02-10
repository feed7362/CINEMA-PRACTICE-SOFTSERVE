using Ardalis.Specification;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Admin;

namespace Backend.Services.Specifications;

public class TicketsByPerformanceSpec : Specification<Ticket>
{
    public TicketsByPerformanceSpec(
            AdminStatsFilterDto filter, 
            int? movieId = null, 
            int? sessionId = null, 
            int? hallId = null
        )
    {
        AdminStatsFiltering.Apply(
                Query, 
                filter, 
                movieId, 
                sessionId, 
                hallId
            );
    }
    public class TicketRevenueSpec : Specification<Ticket, decimal>
    {
        public TicketRevenueSpec(AdminStatsFilterDto filter)
        {
            AdminStatsFiltering.Apply(Query, filter);
            Query.Select(t => t.FinalPrice);
        }
    }
    public class DiscountedTicketsSpec : Specification<Ticket>
    {
        public DiscountedTicketsSpec(
                AdminStatsFilterDto filter, 
                int? movieId = null
            )
        {
            AdminStatsFiltering.Apply(Query, filter, movieId);
            Query.Where(t => true);
        }
    }

    

    public class MovieSalesAnalysisSpec
        : Specification<Ticket, PopularMovieProjection>
    {
        public MovieSalesAnalysisSpec(AdminStatsFilterDto filter)
        {
            AdminStatsFiltering.Apply(Query, filter);
            Query.Select(t => new PopularMovieProjection(
                t.Booking.Session.Movie.TitleUkr,
                t.FinalPrice,
                (double)(t.Booking.Session.Movie.ImdbRating ?? 0m),
                t.Booking.Session.Movie.MovieGenres
                        .Select(mg => mg.Genre.Name)
                        .FirstOrDefault() ?? "Unknown",
                t.Booking.Session.Movie.Director ?? "Unknown",
                t.Booking.Session.Movie.Country ?? "Unknown",
                t.Booking.Session.Movie.ReleaseDate.Year,
                t.Booking.Session.Movie.AgeRating.ToString()
            ));
        }
    }

    public class ConfirmedHallSeatsSpec
        : Specification<Ticket, (int Row, int Number)>
    {
        public ConfirmedHallSeatsSpec(int hallId)
        {
            Query.Where(t => t.Booking.Session.HallId == hallId 
                            && t.Booking.Status == BookingStatus.CONFIRMED)
                 .Select(t => new ValueTuple<int, int>(
                            t.Seat.RowNumber, t.Seat.SeatNumber
                        ));
        }
    }
}
internal static class AdminStatsFiltering
{
    public static void Apply<T>(
            ISpecificationBuilder<T> query, 
            AdminStatsFilterDto filter,                       
            int? movieId = null, 
            int? sessionId = null, 
            int? hallId = null
        ) where T : Ticket
    {
        query.Where(t => t.Booking.Status == BookingStatus.CONFIRMED);

        if (filter.DateFrom.HasValue) 
            query.Where(t => t.Booking.BookingTime >= filter.DateFrom.Value);
        if (filter.DateTo.HasValue)
            query.Where(t => t.Booking.BookingTime <= filter.DateTo.Value);

        if (filter.GenreId.HasValue)
            query.Where(t => t.Booking.Session.Movie.MovieGenres
                        .Any(mg => mg.GenreId == filter.GenreId.Value));

        if (!string.IsNullOrEmpty(filter.Director))
            query.Where(t => t.Booking.Session.Movie.Director != null 
                            && t.Booking.Session.Movie.Director
                                        .Contains(filter.Director));

        if (!string.IsNullOrEmpty(filter.Country))
            query.Where(t => t.Booking.Session.Movie.Country != null 
                            && t.Booking.Session.Movie.Country
                                        .Contains(filter.Country));

        if (filter.MinImdbRating.HasValue)
            query.Where(
                t => t.Booking.Session.Movie.ImdbRating 
                        >= filter.MinImdbRating.Value
            );

        if (filter.AgeRatingValue.HasValue)
            query.Where(
                t => (int)t.Booking.Session.Movie.AgeRating 
                        == filter.AgeRatingValue.Value
            );

        if (movieId.HasValue) 
            query.Where(t => t.Booking.Session.MovieId == movieId.Value);
        if (sessionId.HasValue) 
            query.Where(t => t.Booking.SessionId == sessionId.Value);
        if (hallId.HasValue) 
            query.Where(t => t.Booking.Session.HallId == hallId.Value);
    }
}