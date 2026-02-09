using AutoMapper;
using Backend.Services.DTOs.Discount;
using Backend.Domain.Entities;

namespace Backend.Services.Mappings;

public class DiscountProfile : Profile
{
    public DiscountProfile()
    {
        CreateMap<Discount, DiscountResponseDto>()
            .ForCtorParam("Type", opt => opt.MapFrom(src => (int)src.Type))
            .ForCtorParam("Code", opt => opt.MapFrom(src => src.Code ?? string.Empty));

        CreateMap<CreateDiscountDto, Discount>()
            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => (DiscountType)src.Type));
    }
}