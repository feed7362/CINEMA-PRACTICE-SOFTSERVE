using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum SeatType : short
{
    Regular = 0,
    Vip = 1
}

public class Seat : IEntity
{
    public int Id { get; set; }

    public int HallId { get; set; }

    public SeatType SeatType { get; set; } = SeatType.Regular;

    public int SeatNumber { get; set; }

    public int RowNumber { get; set; }
    
    public Hall Hall { get; set; } = null!;
}