using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Price : IEntity
{
    public long Id { get; set; }

    public long SessionId { get; set; }
    public long SeatTypeId { get; set; }

    public decimal Value { get; set; }

    public Session Session { get; set; } = null!;
    public SeatType SeatType { get; set; } = null!;
}
