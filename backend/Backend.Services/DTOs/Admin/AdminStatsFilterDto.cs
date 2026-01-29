namespace Backend.Services.DTOs.Admin;

public class AdminStatsFilterDto
{
    // Період часу
    public DateTime? DateFrom { get; set; }
    public DateTime? DateTo { get; set; }

    public int? HallId { get; set; }
    
    // Фільтри
    public int? GenreId { get; set; }
    public string? Director { get; set; }
    public string? Country { get; set; }
    public decimal? MinIMDBRating { get; set; }
    public int? AgeRatingValue { get; set; } 

    public int? Amount { get; set; } 
}