namespace Backend.Domain.Entities;

public class Format
{
    public long Id { get; set; }

    public string FormatName { get; set; } = null!;

    public ICollection<Hall> Halls { get; set; } = new List<Hall>();
}