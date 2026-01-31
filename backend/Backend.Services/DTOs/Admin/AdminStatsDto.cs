namespace Backend.Services.DTOs.Admin;

public record AdminStatsDto(
    decimal TotalRevenue,
    int TicketsSold,
    double AverageOccupancy,
    int DiscountedTicketsCount,
    List<GenreStatsDto> GenrePopularity,
    List<SeatHeatmapDto> HallHeatmap
);

public abstract record GenreStatsDto(string GenreName, int TicketsCount);

public record PopularMovieDto(
    string Title, 
    string Genre, 
    string Director, 
    string Country, 
    int ReleaseYear, 
    decimal ImdbRating,
    string AgeRating,
    int TicketsSold, 
    decimal Revenue
);