using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class MovieGenre : IEntity
{
    public long Id { get; set; }
    public long MovieId { get; set; }
    public long GenreId { get; set; }

    public Movie Movie { get; set; } = null!;
    public Genre Genre { get; set; } = null!;
}