using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Discount;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;
using Discount = Backend.Domain.Entities.Discount;

namespace Backend.Services.Services;

public class DiscountService(
    IRepository<Discount> repository,
    IMapper mapper
) : IDiscountService
{
    public async Task<List<DiscountResponseDto>> GetAllDiscountsAsync()
    {
        var spec = new ActiveDiscountsSpec();
        var discounts = await repository.GetListBySpecAsync(spec);
        return mapper.Map<List<DiscountResponseDto>>(discounts);
    }

    public async Task<DiscountResponseDto> 
        CreateDiscountAsync(CreateDiscountDto dto)
    {
        var existing = await repository.GetFirstBySpecAsync(
            new DiscountByCodeSpec(dto.Code)
        );
        if (existing != null) 
            throw new ConflictException("Промокод з такою назвою вже існує.");

        var discount = mapper.Map<Discount>(dto);
        discount.Code = discount.Code?.ToUpper();


        await repository.AddAsync(discount);
        return mapper.Map<DiscountResponseDto>(discount);
    }

    public async Task DeleteDiscountAsync(int id)
    {
        var discount = await repository.GetByIdAsync(id)
            ?? throw new EntityNotFoundException("Знижка", id);

        discount.IsActive = false;

        if (!string.IsNullOrEmpty(discount.Code))
        {
            discount.Code = $"DELETED_{DateTime.UtcNow.Ticks}_{discount.Code}";
        }

        await repository.UpdateAsync(discount);
    }

    public async Task<DiscountResponseDto> ValidatePromocodeAsync(string code)
    {
        var discount = 
            await repository.GetFirstBySpecAsync(new DiscountByCodeSpec(code))
            ?? throw new EntityNotFoundException("Промокод", code);

        if (!(discount.ExpiryDate < DateTime.UtcNow)) return mapper.Map<DiscountResponseDto>(discount);
        discount.IsActive = false;
        await repository.UpdateAsync(discount);
        throw new ConflictException("Термін дії промокоду закінчився.");

    }

    public async Task<List<DiscountTypeDto>> GetDiscountTypesAsync()
    {
        var types = Enum.GetValues<DiscountType>()
            .Select(t => new DiscountTypeDto(
                (int)t,
                t switch
                {
                    DiscountType.STUDENT => "Студентська",
                    DiscountType.MILITARY => "Військова",
                    DiscountType.BIRTHDAY => "День народження",
                    DiscountType.CHILDREN => "Дитяча",
                    _ => "Невідомо"
                }
            ))
            .ToList();

        return await Task.FromResult(types);
    }
}