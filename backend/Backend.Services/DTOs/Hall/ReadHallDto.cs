namespace Backend.Services.DTOs.Hall;

public record ReadHallDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Format { get; set; }
    public required int Capacity { get; set; }
}