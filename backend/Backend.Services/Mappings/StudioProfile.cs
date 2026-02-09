using AutoMapper;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Studio;

namespace Backend.Services.Mappings;

public class StudioProfile : Profile
{
    public StudioProfile()
    {
        CreateMap<Studio, ReadStudioDto>();
    }
}
