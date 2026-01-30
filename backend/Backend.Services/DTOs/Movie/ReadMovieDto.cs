using Backend.Domain.Entities;

namespace Backend.Services.DTOs.Movie;

public record ReadMovieDto
{
    public int Id { get; set; }
    public required string StudioName { get; set; }
    public required string TitleOrg { get; set; }
    public required string TitleUkr { get; set; }
    public string? Description { get; set; }
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public DateTime FinishDate { get; set; }
    public AgeRating AgeRating { get; set; } = AgeRating._0Plus;
    public decimal? ImdbRating { get; set; }
    public string? Director { get; set; }
    public string? Country { get; set; }
    public bool Subtitles { get; set; }
    public string? ImageUrl { get; set; }
    public string? TrailerUrl { get; set; }

    public List<string> GenreNames { get; set; } = [];
    public List<string> ActorNames { get; set; } = [];
}