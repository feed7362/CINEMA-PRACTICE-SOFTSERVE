namespace Backend.Services.DTOs.Discount;
public record CreateDiscountDto(
        string Code, 
        int Percentage, 
        DateTime ExpiryDate,
        int Type
    );