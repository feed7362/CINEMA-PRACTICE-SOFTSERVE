using Backend.Domain.Entities;

namespace Backend.Services.DTOs.Movie;

public record UpdateMovieDto
{
    public  int Id { get; set; }
    public int StudioId { get; set; }
    public required string TitleOrg { get; set; }
    public required string TitleUkr { get; set; }
    public required string Description { get; set; }
    public required int Duration { get; set; }
    public required DateTime ReleaseDate { get; set; }
    public required DateTime FinishDate { get; set; }
    public required AgeRating AgeRating { get; set; } = AgeRating._0Plus;
    public decimal? ImdbRating { get; set; }
    public string? Director { get; set; }
    public string? Country { get; set; }
    public bool Subtitles { get; set; }
    public string? ImageUrl { get; set; }
    public string? TrailerUrl { get; set; }

    public List<int> GenreIds { get; set; } = [];
    public List<int> ActorIds { get; set; } = [];
}