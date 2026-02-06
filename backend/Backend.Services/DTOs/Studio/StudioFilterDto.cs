namespace Backend.Services.DTOs.Studio;

public class StudioFilterDto
{
    public string? SearchTerm { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 100; 
}