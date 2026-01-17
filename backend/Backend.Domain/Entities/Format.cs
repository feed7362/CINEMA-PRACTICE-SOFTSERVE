using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Format : IEntity
{
    public long Id { get; set; }

    public string FormatName { get; set; } = null!;

    public ICollection<Hall> Halls { get; set; } = new List<Hall>();
}