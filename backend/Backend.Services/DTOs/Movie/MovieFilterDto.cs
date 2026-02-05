namespace Backend.Services.DTOs.Movie;

public class MovieFilterDto
{
    public string? SearchTerm { get; set; }
    public IEnumerable<int>? GenreIds { get; set; } 
    public int? GenreId { get; set; }
    public int? StudioId { get; set; }
    public bool? IsComingSoon { get; set; }
    public string? SortBy { get; set; }
    public int? SortDirection { get; set; }
    public int? MinRating { get; set; }
    public int? PageNumber { get; set; } = 1;
    public int? PageSize { get; set; } = 10;
}