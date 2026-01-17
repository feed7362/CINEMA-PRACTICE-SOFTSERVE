namespace Backend.Domain.Entities;

public class Hall
{
    public long Id { get; set; }

    public long FormatId { get; set; }

    public string HallName { get; set; } = null!;
    public int Capacity { get; set; }

    public Format Format { get; set; } = null!;
    public ICollection<Seat> Seats { get; set; } = new List<Seat>();
}