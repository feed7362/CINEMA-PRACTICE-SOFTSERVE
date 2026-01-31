namespace Backend.Services.DTOs.Session;

public record UpdateSessionDto
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public int HallId { get; set; }
    public DateTime StartTime { get; set; }
}