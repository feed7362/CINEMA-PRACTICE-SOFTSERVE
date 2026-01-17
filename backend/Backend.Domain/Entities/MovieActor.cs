namespace Backend.Domain.Entities;

public class MovieActor
{
    public long MovieId { get; set; }
    public long ActorId { get; set; }

    public Movie Movie { get; set; } = null!;
    public Actor Actor { get; set; } = null!;
}