namespace Backend.Services.DTOs.Movie;

public record MovieRecommendationDto
{
    public int Id { get; set; }
    public required string TitleOrg { get; set; }
    public required string TitleUkr { get; set; }
    public string? Director { get; set; }
    public decimal? ImdbRating { get; set; }
    public List<string> Actors { get; set; } = [];
    public List<string> Genres { get; set; } = [];
}
