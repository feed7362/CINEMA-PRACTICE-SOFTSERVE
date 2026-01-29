using Backend.Services.DTOs.Admin;

namespace Backend.Services.Interfaces;

public interface IAdminStatsService
{
    Task<decimal> GetTotalRevenueAsync(DateTime from, DateTime? to);

    Task<double> GetSessionOccupancyAsync(int sessionId);

    Task<List<SeatHeatmapDto>> GetHallHeatmapAsync(int hallId);

    Task<int> GetSpecialTicketsCountAsync(int movieId, DateTime? from, DateTime? to);

    Task<List<PopularMovieDto>> GetFilteredPopularMoviesAsync(AdminStatsFilterDto filter);
}