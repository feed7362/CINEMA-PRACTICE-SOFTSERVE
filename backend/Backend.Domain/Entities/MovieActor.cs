using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class MovieActor : IEntity
{
    public long Id { get; set; }
    public long MovieId { get; set; }
    public long ActorId { get; set; }

    public Movie Movie { get; set; } = null!;
    public Actor Actor { get; set; } = null!;
}