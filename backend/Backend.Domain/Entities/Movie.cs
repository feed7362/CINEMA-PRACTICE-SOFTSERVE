using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum AgeRating : short
{
    _0Plus = 0,
    _12Plus = 12,
    _16Plus = 16,
    _18Plus = 18,
}

public class Movie : IEntity
{
    public int Id { get; set; }

    public int StudioId { get; set; }

    public string TitleOrg { get; set; } = null!;

    public string TitleUkr { get; set; } = null!;

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

    public Studio Studio { get; set; } = null!;

    public ICollection<Session> Sessions { get; set; } 
        = new List<Session>();
    public ICollection<MovieActor> MovieActors { get; set; } 
        = new List<MovieActor>();
    public ICollection<MovieGenre> MovieGenres { get; set; } 
        = new List<MovieGenre>();

}
