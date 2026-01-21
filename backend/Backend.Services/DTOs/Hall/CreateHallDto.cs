namespace Backend.Services.DTOs.Hall;

public class CreateHallDto
{
    public string Name { get; set; } = string.Empty;
    public int Format { get; set; }

    // Example Input: ["RRRR_RRRR", "PPPP_PPPP", "VVVV_VVVV"]
    public List<string> SeatMap { get; set; } = new();
}