using AutoMapper;
using Backend.Services.DTOs.Hall;
using Backend.Domain.Entities;

namespace Backend.Services.Mappings;

public class HallProfile : Profile
{
    public HallProfile()
    {
        CreateMap<Hall, ReadHallDto>()
            .ForMember(dest => dest.Format, opt => opt.MapFrom(src => src.Format.ToString()));

        CreateMap<CreateHallDto, Hall>()
            .ForMember(dest => dest.Seats, opt => opt.Ignore());

        CreateMap<UpdateHallDto, Hall>()
            .ForMember(dest => dest.Seats, opt => opt.Ignore());
    }
}