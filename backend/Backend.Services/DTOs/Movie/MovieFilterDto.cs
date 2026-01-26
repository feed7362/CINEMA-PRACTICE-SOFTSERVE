namespace Backend.Services.DTOs.Movie;

public class MovieFilterDto
{
    // Pagination
    public int? PageNumber { get; set; } = 1;
    public int? PageSize { get; set; } = 10;
    // Filters
    public string? SearchTerm { get; set; }
    public int? GenreId { get; set; }
    public int? StudioId { get; set; }
    public bool? IsComingSoon { get; set; }
}