using Backend.Services.DTOs.Studio;

namespace Backend.Services.Interfaces;

public interface IStudioService
{
    Task<IEnumerable<ReadStudioDto>> GetAllStudiosAsync(
            StudioFilterDto filter
        );
}