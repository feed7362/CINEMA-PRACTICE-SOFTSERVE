using AutoMapper;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Contact;

namespace Backend.Services.Mappings;

public class ContactProfile : Profile
{
    public ContactProfile()
    {
        CreateMap<CreateContactDto, ContactMessage>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow));
    }
}