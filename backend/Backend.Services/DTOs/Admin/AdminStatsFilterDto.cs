namespace Backend.Services.DTOs.Admin;

public record AdminStatsFilterDto(
    DateTime? FromDate = null,
    DateTime? ToDate = null,
    int? MovieId = null,
    int? SessionId = null,
    int? GenreId = null,
    int? HallId = null
);