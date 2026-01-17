namespace Backend.Domain.Entities;

public class Genre
{
    public long Id { get; set; }

    public string GenreName { get; set; } = null!;

    public ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();
}