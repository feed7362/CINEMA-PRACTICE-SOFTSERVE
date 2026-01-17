using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class SeatType : IEntity
{
    public long Id { get; set; }

    public string SeatTypeName { get; set; } = null!;

    public ICollection<Seat> Seats { get; set; } = new List<Seat>();
}