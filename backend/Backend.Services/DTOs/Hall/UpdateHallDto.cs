namespace Backend.Services.DTOs.Hall;

public class UpdateHallDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Format { get; set; }
}