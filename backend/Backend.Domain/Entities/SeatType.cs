namespace Backend.Domain.Entities;

public class SeatType
{
    public long Id { get; set; }

    public string SeatTypeName { get; set; } = null!;

    public ICollection<Seat> Seats { get; set; } = new List<Seat>();
}