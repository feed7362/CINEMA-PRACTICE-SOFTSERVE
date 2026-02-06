namespace Backend.Services.DTOs.Hall;

public record UpdateHallDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Format { get; set; }
    public List<string> SeatMap { get; set; } = new();
}