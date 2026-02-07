using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Genre : IEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public ICollection<MovieGenre> MovieGenres { get; set; } 
        = new List<MovieGenre>();
}