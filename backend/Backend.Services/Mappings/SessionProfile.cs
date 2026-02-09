using AutoMapper;
using Backend.Services.DTOs.Session;
using Backend.Domain.Entities;

namespace Backend.Services.Mappings;

public class SessionProfile : Profile
{
    public SessionProfile()
    {
        CreateMap<Session, ReadSessionDto>()
            .ForMember(dest => dest.HallName, opt => opt.MapFrom(src => src.Hall.Name))
            .ForMember(dest => dest.HallFormat, opt => opt.MapFrom(src => src.Hall.Format.ToString()));

        CreateMap<CreateSessionDto, Session>();

        CreateMap<UpdateSessionDto, Session>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
    }
}