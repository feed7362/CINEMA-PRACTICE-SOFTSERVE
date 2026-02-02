public enum MovieSortBy
{
    ReleaseDate,
    Title,
    ImdbRating,
    Duration
}

public enum SortDirection
{
    Asc,
    Desc
}

public record MovieFilterDto
{
    public string? SearchTerm { get; set; }
    public int? GenreId { get; set; }
    public int? StudioId { get; set; }
    public bool? IsComingSoon { get; set; }

    public MovieSortBy? SortBy { get; set; }
    public SortDirection? SortDirection { get; set; }

    public int? PageNumber { get; set; }
    public int? PageSize { get; set; }
}