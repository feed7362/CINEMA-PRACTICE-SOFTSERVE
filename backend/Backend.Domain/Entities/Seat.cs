using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum SeatType : short
{
    REGULAR = 0,
    PREMIUM = 1,
    VIP = 2
}

public class Seat : IEntity
{
    public int Id { get; set; }

    public int HallId { get; set; }

    public SeatType SeatType { get; set; } = SeatType.REGULAR;

    public int SeatNumber { get; set; }

    public int RowNumber { get; set; }

    public bool IsReserved { get; set; }

    public Hall Hall { get; set; } = null!;
}