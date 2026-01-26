using Backend.Domain.Entities;

namespace Backend.Services.DTOs.Movie;

public class ReadMovieDto
{
    public int Id { get; set; }
    public string StudioName { get; set; }
    public string TitleORG { get; set; }
    public string TitleUKR { get; set; }
    public string? Description { get; set; }
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public DateTime FinishDate { get; set; }
    public AgeRating AgeRating { get; set; } = AgeRating._0Plus;
    public decimal? IMDBRating { get; set; }
    public string? Director { get; set; }
    public string? Country { get; set; }
    public bool Subtitles { get; set; }
    public string? ImageURL { get; set; }
    public string? TrailerURL { get; set; }
    
    public List<string> GenreNames { get; set; } = [];
    public List<string> ActorNames { get; set; } = [];
}