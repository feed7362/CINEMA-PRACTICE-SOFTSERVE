using AutoMapper;
using Backend.Services.DTOs.Discount;
using Backend.Domain.Entities;

namespace Backend.Services.Mappings;

public class DiscountProfile : Profile
{
    public DiscountProfile()
    {
        CreateMap<Discount, DiscountResponseDto>();
        CreateMap<CreateDiscountDto, Discount>()
            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true));
    }
}