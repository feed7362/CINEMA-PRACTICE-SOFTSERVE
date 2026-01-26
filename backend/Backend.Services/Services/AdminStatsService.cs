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

        var filter = new AdminStatsFilterDto { FromDate = utcFrom, ToDate = actualToDate };
        var spec = new AdminStatsSpecification(filter);

        var tickets = await ticketRepository.GetListBySpecAsync(spec);
        return tickets.Sum(t => t.FinalPrice);
    }

    public async Task<double> GetSessionOccupancyAsync(int sessionId)
    {
        var filter = new AdminStatsFilterDto { SessionId = sessionId };
        var spec = new AdminStatsSpecification(filter);
        var ticketsSold = await ticketRepository.CountAsync(spec);

        var sessionWithHall = await sessionRepository.GetFirstBySpecAsync(new SessionsByIdsSpec([sessionId]));
        var capacity = sessionWithHall?.Hall.Capacity ?? 0;

        return capacity > 0 ? (double)ticketsSold / capacity * 100 : 0;
    }

    public async Task<List<TopMovieDto>> GetTopMoviesAsync()
    {
        var spec = new AdminStatsSpecification(new AdminStatsFilterDto());
        var tickets = await ticketRepository.GetListBySpecAsync(spec);

        return tickets
            .GroupBy(t => t.Booking.Session.Movie.TitleUKR)
            .Select(g => new TopMovieDto(g.Key, g.Count(), g.Sum(t => t.FinalPrice)))
            .OrderByDescending(m => m.TicketsCount)
            .Take(3)
            .ToList();
    }

    public async Task<int> GetSpecialTicketsCountAsync(int movieId, DateTime? from, DateTime? to)
    {
        var utcFrom = Normalize(from);
        var utcTo = Normalize(to);

        var filter = new AdminStatsFilterDto { MovieId = movieId, FromDate = utcFrom, ToDate = utcTo };
        var spec = new AdminStatsSpecification(filter);
        var tickets = await ticketRepository.GetListBySpecAsync(spec);

        return tickets.Count(t => t.Discount is { Percentage: > 0 });
    }

    public async Task<TopMovieDto?> GetMostPopularMovieByGenreAsync(int genreId)
    {
        var filter = new AdminStatsFilterDto { GenreId = genreId };
        var spec = new AdminStatsSpecification(filter);
        var tickets = await ticketRepository.GetListBySpecAsync(spec);

        return tickets
            .GroupBy(t => t.Booking.Session.Movie.TitleUKR)
            .Select(g => new TopMovieDto(g.Key, g.Count(), g.Sum(t => t.FinalPrice)))
            .OrderByDescending(m => m.TicketsCount)
            .FirstOrDefault();
    }

    public async Task<List<SeatHeatmapDto>> GetHallHeatmapAsync(int hallId)
    {
        var filter = new AdminStatsFilterDto { HallId = hallId };
        var spec = new AdminStatsSpecification(filter);

        var tickets = await ticketRepository.GetListBySpecAsync(spec);

        var rawStats = tickets
            .GroupBy(t => new { t.Seat.RowNumber, t.Seat.SeatNumber })
            .Select(g => new
            {
                Row = g.Key.RowNumber,
                Number = g.Key.SeatNumber,
                Count = g.Count()
            })
            .ToList();

        var averageSales = rawStats.Count != 0 ? rawStats.Average(x => x.Count) : 0;

        var heatmap = rawStats.Select(seat =>
            {
                var color = seat.Count >= averageSales ? "Red" : "Blue";

                return new SeatHeatmapDto(seat.Row, seat.Number, seat.Count, color);
            })
            .ToList();

        return heatmap;
    }
}