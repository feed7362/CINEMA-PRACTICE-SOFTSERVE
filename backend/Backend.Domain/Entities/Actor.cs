using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Actor : IEntity
{
    public int Id { get; set; }

    public string ActorName { get; set; } = null!;

    public ICollection<MovieActor> MovieActors { get; set; } = new List<MovieActor>();
}