using Backend.Services.DTOs.Seat;
using Backend.Services.DTOs.Session;

namespace Backend.Services.Interfaces;

public interface ISessionService
{
    Task<ReadSessionDto> CreateSessionAsync(CreateSessionDto dto);

    Task<ReadSessionDto?> UpdateSessionAsync(UpdateSessionDto dto);

    Task<ReadSessionDto?> GetSessionByIdAsync(int id);

    Task<List<ReadSessionDto>> GetAllSessionsAsync();

    Task<ReadSessionDto?> DeleteSessionAsync(int id);

    Task<List<SeatStatusDto>> GetSeatsBySessionAsync(int sessionId);

}