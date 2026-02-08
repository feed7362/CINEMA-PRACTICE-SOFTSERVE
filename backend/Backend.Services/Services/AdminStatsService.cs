using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Admin;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;
using static Backend.Services.Specifications.TicketsByPerformanceSpec;

namespace Backend.Services.Services;

public class AdminStatsService(
        IRepository<Ticket> ticketRepository,
        IRepository<Session> sessionRepository
    ) : IAdminStatsService
{
    private static DateTime? Normalize(DateTime? date)
    {
        if (!date.HasValue) return null;
        return date.Value.Kind == DateTimeKind.Unspecified
            ? DateTime.SpecifyKind(date.Value, DateTimeKind.Utc)
            : date.Value.ToUniversalTime();
    }

    public async Task<decimal> GetTotalRevenueAsync(
            DateTime from,
            DateTime? to
        )
    {
        var filter = new AdminStatsFilterDto { 
            DateFrom = Normalize(from), 
            DateTo = Normalize(to) 
        };

        var prices = await ticketRepository.GetListBySpecAsync(
                new TicketRevenueSpec(filter)
            );

        return prices.Sum();
    }

    public async Task<double> GetSessionOccupancyAsync(int sessionId)
    {

        var sessionWithHall = await sessionRepository
            .GetFirstBySpecAsync(new SessionsByIdsSpec([sessionId]))
            ?? throw new EntityNotFoundException("Сеанс", sessionId);


        var spec = new TicketsByPerformanceSpec(
                new AdminStatsFilterDto(), 
                sessionId: sessionId
            );
        var ticketsSold = await ticketRepository.CountAsync(spec);

        var capacity = sessionWithHall.Hall.Capacity;
        return capacity > 0 ? (double)ticketsSold / capacity * 100 : 0;
    }

    public async Task<int> GetSpecialTicketsCountAsync(
            int? movieId, 
            DateTime? from, 
            DateTime? to
        )
    {
        var filter = new AdminStatsFilterDto
        {
            DateFrom = Normalize(from),
            DateTo = Normalize(to)
        };

        var spec = new DiscountedTicketsSpec(filter, movieId);
        return await ticketRepository.CountAsync(spec);
    }

    public async Task<List<SeatHeatmapDto>> GetHallHeatmapAsync(int hallId)
    {
        var seats = await ticketRepository.GetListBySpecAsync(
                new ConfirmedHallSeatsSpec(hallId)
            );

        if (!seats.Any()) return [];

        var stats = seats
            .GroupBy(s => s)
            .Select(g => new { 
                Row = g.Key.Row, 
                Number = g.Key.Number, 
                Count = g.Count() 
            })
            .ToList();

        var average = stats.Average(x => x.Count);


        return stats.Select(s => new SeatHeatmapDto(
            s.Row,
            s.Number,
            s.Count,
            s.Count >= average ? "Red" : "Blue"
        )).ToList();
    }

    public async Task<List<PopularMovieDto>> GetFilteredPopularMoviesAsync(
            AdminStatsFilterDto filter
        )
    {
        var data = await ticketRepository.GetListBySpecAsync(
                new MovieSalesAnalysisSpec(filter)
            );

        var result = data
            .GroupBy(d => d.Title)
            .Select(g => {
                var first = g.First();
                return new PopularMovieDto(
                    Title: g.Key,
                    Genre: first.Genre,
                    Director: first.Director,
                    Country: first.Country,
                    ReleaseYear: first.ReleaseYear,
                    ImdbRating: first.ImdbRating,
                    AgeRating: first.AgeRating,
                    TicketsSold: g.Count(),
                    Revenue: g.Sum(x => x.Price)
                );
            });

        return result
            .OrderByDescending(x => x.TicketsSold)
            .Take(filter.Amount ?? 5)
            .ToList();
    }
}