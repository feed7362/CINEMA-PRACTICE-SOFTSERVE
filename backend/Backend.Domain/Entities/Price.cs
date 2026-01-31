using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Price : IEntity
{
    public int Id { get; set; }

    public int SessionId { get; set; }

    public SeatType SeatType { get; set; } = SeatType.Regular;

    public decimal Value { get; set; }

    public Session Session { get; set; } = null!;
}
