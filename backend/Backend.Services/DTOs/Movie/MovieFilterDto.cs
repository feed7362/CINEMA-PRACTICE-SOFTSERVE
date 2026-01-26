namespace Backend.Services.DTOs.Movie;

public class MovieFilterDto
{
    // Pagination
    public int? PageNumber { get; set; }

    public int? PageSize { get; set; }
    // Filters
    public string? SearchTerm { get; set; }
    public int? GenreId { get; set; }
    public int? StudioId { get; set; }
    public bool? IsComingSoon { get; set; }
}
public record PagedResponse<T>(List<T> Items, int TotalCount, int PageNumber, int PageSize);