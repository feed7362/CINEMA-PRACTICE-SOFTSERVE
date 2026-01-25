namespace Backend.Services.DTOs.Session;

public class UpdateSessionDto
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public int HallId { get; set; }
    public DateTime StartTime { get; set; }
}