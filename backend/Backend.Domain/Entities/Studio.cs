using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Studio : IEntity
{
    public int Id { get; set; }

    public string StudioName { get; set; } = null!;

    public ICollection<Movie> Movies { get; set; } = new List<Movie>();
}
