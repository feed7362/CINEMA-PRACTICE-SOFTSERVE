namespace Backend.Domain.Entities;

public class Studio
{
    public long Id { get; set; }

    public string StudioName { get; set; } = null!;

    public ICollection<Movie> Movies { get; set; } = new List<Movie>();
}
