using Backend.Services.DTOs;
using Backend.Services.DTOs.Studio;

namespace Backend.Services.Interfaces;

public interface IStudioService
{
    Task<PagedResponse<ReadStudioDto>> GetAllStudiosAsync(
            StudioFilterDto filter
        );
}