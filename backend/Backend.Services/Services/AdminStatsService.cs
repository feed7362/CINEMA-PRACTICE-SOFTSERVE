using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Admin;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;

namespace Backend.Services.Services;

public class AdminStatsService(
    IRepository<Ticket> ticketRepository,
    IRepository<Session> sessionRepository) : IAdminStatsService
{
    private static DateTime? Normalize(DateTime? date)
    {
        if (!date.HasValue) return null;
        return date.Value.Kind == DateTimeKind.Unspecified
            ? DateTime.SpecifyKind(date.Value, DateTimeKind.Utc)
            : date.Value.ToUniversalTime();
    }

    public async Task<decimal> GetTotalRevenueAsync(DateTime from, DateTime? to)
    {
        var utcFrom = Normalize(from)!.Value;
        var utcTo = Normalize(to);
        var actualToDate = utcTo ?? utcFrom.AddDays(1).AddTicks(-1);

        var filter = new AdminStatsFilterDto { DateFrom = utcFrom, DateTo = actualToDate };
        var spec = new AdminStatsSpecification(filter); // ID не передаємо

        var tickets = await ticketRepository.GetListBySpecAsync(spec);
        return tickets.Sum(t => t.FinalPrice);
    }

    public async Task<double> GetSessionOccupancyAsync(int sessionId)
    {
        // Передаємо пустий фільтр, але заповнюємо sessionId в конструкторі
        var spec = new AdminStatsSpecification(new AdminStatsFilterDto(), sessionId: sessionId);
        var ticketsSold = await ticketRepository.CountAsync(spec);

        var sessionWithHall = await sessionRepository.GetFirstBySpecAsync(new SessionsByIdsSpec([sessionId]));
        var capacity = sessionWithHall?.Hall.Capacity ?? 0;

        return capacity > 0 ? (double)ticketsSold / capacity * 100 : 0;
    }

    public async Task<int> GetSpecialTicketsCountAsync(int? movieId, DateTime? from, DateTime? to)
    {
        var utcFrom = Normalize(from);
        var utcTo = Normalize(to);
        var filter = new AdminStatsFilterDto { DateFrom = utcFrom, DateTo = utcTo };

        // Передаємо movieId в конструктор
        var spec = new AdminStatsSpecification(filter, movieId: movieId);
        
        var tickets = await ticketRepository.GetListBySpecAsync(spec);
        return tickets.Count(t => t.Discount is { Percentage: > 0 });
    }

    public async Task<List<SeatHeatmapDto>> GetHallHeatmapAsync(int hallId)
    {
        // Передаємо hallId в конструктор
        var spec = new AdminStatsSpecification(new AdminStatsFilterDto(), hallId: hallId);

        var tickets = await ticketRepository.GetListBySpecAsync(spec);

        var rawStats = tickets
            .GroupBy(t => new { t.Seat.RowNumber, t.Seat.SeatNumber })
            .Select(g => new { Row = g.Key.RowNumber, Number = g.Key.SeatNumber, Count = g.Count() })
            .ToList();

        var averageSales = rawStats.Count != 0 ? rawStats.Average(x => x.Count) : 0;

        return rawStats.Select(seat =>
        {
            var color = seat.Count >= averageSales ? "Red" : "Blue";
            return new SeatHeatmapDto(seat.Row, seat.Number, seat.Count, color);
        }).ToList();
    }

   public async Task<List<PopularMovieDto>> GetFilteredPopularMoviesAsync(AdminStatsFilterDto filter)
    {
        var spec = new AdminStatsSpecification(filter);
        var tickets = await ticketRepository.GetListBySpecAsync(spec);

        var query = tickets
                .GroupBy(t => new {
                    t.Booking.Session.Movie.TitleUKR,
                    Genre = t.Booking.Session.Movie.MovieGenres.Select(mg => mg.Genre.Name).FirstOrDefault() ?? "Unknown",
                    t.Booking.Session.Movie.Director,
                    t.Booking.Session.Movie.Country,
                    ReleaseYear = t.Booking.Session.Movie.ReleaseDate.Year, 
                    IMDB = t.Booking.Session.Movie.IMDBRating,             
                    Age = t.Booking.Session.Movie.AgeRating               
                }) 
                .Select(g => new PopularMovieDto(
                    g.Key.TitleUKR,
                    g.Key.Genre,
                    g.Key.Director,
                    g.Key.Country,
                    g.Key.ReleaseYear,
                    g.Key.IMDB ?? 0, 
                    g.Key.Age.ToString(),   
                    g.Count(),
                    g.Sum(t => t.FinalPrice)
                ));

        if (filter.MinIMDBRating.HasValue)
            query = query.Where(x => x.IMDBRating >= filter.MinIMDBRating.Value);
        
        var takeCount = (filter.Amount.HasValue && filter.Amount.Value > 0) 
            ? filter.Amount.Value 
            : 3;

        return query
            .OrderByDescending(x => x.TicketsSold)
            .Take(takeCount) 
            .ToList();
    }
}