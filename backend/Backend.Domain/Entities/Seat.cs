using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Seat : IEntity
{
    public long Id { get; set; }

    public long HallId { get; set; }
    public long SeatTypeId { get; set; }

    public int SeatNumber { get; set; }
    public int RowNumber { get; set; }
    
    public bool IsReserved { get; set; }

    public Hall Hall { get; set; } = null!;
    public SeatType SeatType { get; set; } = null!;
}