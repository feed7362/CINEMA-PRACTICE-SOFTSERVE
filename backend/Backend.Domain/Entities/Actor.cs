namespace Backend.Domain.Entities;

public class Actor
{
    public long Id { get; set; }

    public string ActorName { get; set; } = null!;

    public ICollection<MovieActor> MovieActors { get; set; } = new List<MovieActor>();
}