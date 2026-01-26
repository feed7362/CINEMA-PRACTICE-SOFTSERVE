namespace Backend.Services.DTOs.Admin;

public record AdminStatsDto(
    decimal TotalRevenue,
    int TicketsSold,
    double AverageOccupancy,
    List<TopMovieDto> TopMovies,
    int DiscountedTicketsCount,
    List<GenreStatsDto> GenrePopularity,
    List<SeatHeatmapDto> HallHeatmap
);

public record TopMovieDto(string Title, int TicketsCount, decimal Revenue);
public record GenreStatsDto(string GenreName, int TicketsCount);
