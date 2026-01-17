using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Movie : IEntity
{
    public long Id { get; set; }

    public long StudioId { get; set; }

    public string MovieTitleORG { get; set; } = null!;
    public string MovieTitleUKR { get; set; } = null!;
    public string? Description { get; set; }

    public int Duration { get; set; }

    public DateTime ReleaseDate { get; set; }
    public DateTime? FinishDate { get; set; }

    public int AgeRating { get; set; }
    public decimal? IMDBRating { get; set; }

    public string? Director { get; set; }
    public string? Country { get; set; }
    public bool Subtitles { get; set; }

    public string? ImageURL { get; set; }
    public string? TrailerURL { get; set; }

    public Studio Studio { get; set; } = null!;

    public ICollection<Session> Sessions { get; set; } = new List<Session>();
    public ICollection<MovieActor> MovieActors { get; set; } = new List<MovieActor>();
    public ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();
}
