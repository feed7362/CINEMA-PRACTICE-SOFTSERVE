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
    double ImdbRating,
    string AgeRating,
    int TicketsSold, 
    decimal Revenue
);

public record PopularMovieProjection(
    string Title,
    decimal Price,
    double ImdbRating,
    string Genre,
    string Director,
    string Country,
    int ReleaseYear,
    string AgeRating
);