namespace Backend.Services.DTOs.Session;

public record ReadSessionDto
{
    public int Id { get; init; }
    public int? MovieId { get; init; }
    public int? HallId { get; init; }
    public DateTime StartTime { get; init; }
    public DateTime EndTime { get; init; }
}