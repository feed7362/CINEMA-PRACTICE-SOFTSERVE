using Backend.Services.DTOs.Hall;

namespace Backend.Services.Interfaces;

public interface IHallService
{
    Task<ReadHallDto> CreateHallAsync(CreateHallDto dto);

    Task<ReadHallDto?> UpdateHallAsync(UpdateHallDto dto);

    Task<ReadHallDto?> GetHallByIdAsync(int id);

    Task<List<ReadHallDto>> GetAllHallsAsync();

    Task<ReadHallDto?> DeleteHallAsync(int id);
}