using Backend.Services.DTOs.Admin;

namespace Backend.Services.Interfaces;

public interface IAdminStatsService
{
    Task<decimal> GetTotalRevenueAsync(DateTime from, DateTime? to);

    Task<double> GetSessionOccupancyAsync(int sessionId);

    Task<List<TopMovieDto>> GetTopMoviesAsync();

    Task<int> GetSpecialTicketsCountAsync(int? movieId, DateTime? from, DateTime? to);

    Task<TopMovieDto?> GetMostPopularMovieByGenreAsync(int genreId);

    Task<List<SeatHeatmapDto>> GetHallHeatmapAsync(int hallId);
}