using AutoMapper;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Admin;
using System.Text.Json;

namespace Backend.Services.Mappings;

public class AdminProfile : Profile
{
    public AdminProfile()
    {
        CreateMap<AuditLog, AuditLogDto>()
            .ForCtorParam("Changes", opt => opt.MapFrom(src =>
                string.IsNullOrEmpty(src.Changes)
                    ? new { }
                    : JsonSerializer.Deserialize<object>(src.Changes, (JsonSerializerOptions?)null) ?? new { }));

        CreateMap<ErrorLog, ErrorLogDto>();
    }
}
