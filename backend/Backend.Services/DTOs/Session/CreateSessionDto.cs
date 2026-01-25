namespace Backend.Services.DTOs.Session;

public class CreateSessionDto
{
    public int MovieId { get; set; }
    public int HallId { get; set; }
    public DateTime StartTime { get; set; }
}