namespace Backend.Services.DTOs.Seat;

public record SeatStatusDto
{
    public int Id { get; set; }
    public int RowNumber { get; set; }
    public int SeatNumber { get; set; }
    public string SeatType { get; set; }
    public bool IsReserved { get; set; }
}
