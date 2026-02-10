using Backend.Services.DTOs.Discount;

namespace Backend.Services.Interfaces;

public interface IDiscountService
{
    Task<List<DiscountResponseDto>> GetAllDiscountsAsync();

    Task<DiscountResponseDto> CreateDiscountAsync(CreateDiscountDto dto);

    Task DeleteDiscountAsync(int id);

    Task<DiscountResponseDto> ValidatePromocodeAsync(string code);
    Task<List<DiscountTypeDto>> GetDiscountTypesAsync();
}