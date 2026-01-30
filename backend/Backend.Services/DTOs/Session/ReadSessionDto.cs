namespace Backend.Services.DTOs.Session;

public record ReadSessionDto
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public int HallId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}