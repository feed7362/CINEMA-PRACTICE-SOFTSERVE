using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Session;
using Backend.Services.Interfaces;

namespace Backend.Services.Services;

public class SessionService(IRepository<Session> sessionRepository, IRepository<Movie> movieRepository)
    : ISessionService
{
    public async Task<ReadSessionDto> CreateSessionAsync(CreateSessionDto dto)
    {
        var session = new Session()
        {
            MovieId = dto.MovieId,
            HallId = dto.HallId,
            StartTime = dto.StartTime
        };

        var movie = await movieRepository.GetByIdAsync(dto.MovieId);
        if (movie == null) throw new Exception("Movie not found");
        
        session.EndTime = session.StartTime.AddMinutes(movie.Duration);
        await sessionRepository.AddAsync(session);

        return new ReadSessionDto()
        {
            Id = session.Id,
            MovieId = dto.MovieId,
            HallId = dto.HallId,
            StartTime = dto.StartTime,
            EndTime = session.EndTime
        };
    }

    public async Task<ReadSessionDto?> UpdateSessionAsync(UpdateSessionDto dto)
    {
        var session = await sessionRepository.GetByIdAsync(dto.Id);
        if (session == null) return null;
        
        var movie = await movieRepository.GetByIdAsync(dto.MovieId);
        if (movie == null) return null;

        session.MovieId = dto.MovieId;
        session.HallId = dto.HallId;
        session.StartTime = dto.StartTime;
        session.EndTime = session.StartTime.AddMinutes(movie.Duration);
        
        await sessionRepository.UpdateAsync(session);

        return new ReadSessionDto()
        {
            Id = session.Id,
            MovieId = dto.MovieId,
            HallId = dto.HallId,
            StartTime = dto.StartTime,
            EndTime = session.EndTime
        };
    }

    public async Task<ReadSessionDto?> GetSessionByIdAsync(int id)
    {
        var session = await sessionRepository.GetByIdAsync(id);

        if (session == null) return null;

        return new ReadSessionDto()
        {
            Id = session.Id,
            MovieId = session.MovieId,
            HallId = session.HallId,
            StartTime = session.StartTime,
            EndTime = session.EndTime
        };
    }

    public async Task<List<ReadSessionDto>> GetAllSessionsAsync()
    {
        var session = await sessionRepository.GetAllAsync();

        return session.Select(s => new ReadSessionDto()
        {
            Id = s.Id,
            MovieId = s.MovieId,
            HallId = s.HallId,
            StartTime = s.StartTime,
            EndTime = s.EndTime
        }).ToList();
    }

    public async Task DeleteSessionAsync(int id)
    {
        await sessionRepository.DeleteAsync(id);
    }
}