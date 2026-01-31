namespace Backend.Services.DTOs.Admin;

public record SeatHeatmapDto(
    int Row, 
    int Number, 
    int PurchaseCount, 
    string Color
);