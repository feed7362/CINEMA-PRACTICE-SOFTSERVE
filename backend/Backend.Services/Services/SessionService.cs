using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Seat;
using Backend.Services.DTOs.Session;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;
using Hall = Backend.Domain.Entities.Hall;

namespace Backend.Services.Services;

public class SessionService(
        IRepository<Session> sessionRepository,
        IRepository<Movie> movieRepository,
        IRepository<Hall> hallRepository,
        IRepository<Ticket> ticketRepository,
        IRepository<Seat> seatRepository
    )
    : ISessionService
{
    public async Task<ReadSessionDto> CreateSessionAsync(CreateSessionDto dto)
    {
        var movie = await movieRepository.GetByIdAsync(dto.MovieId);
        if (movie == null) throw new Exception("Movie not found");

        var hall = await hallRepository.GetByIdAsync(dto.HallId);
        if (hall == null) throw new Exception("Hall not found");


        var endTime = dto.StartTime.AddMinutes(movie.Duration);
        var overlapSpec = new SessionOverlapSpec(
                dto.HallId, 
                dto.StartTime, 
                endTime
            );
        var conflictingSessions = await sessionRepository
                                        .CountAsync(overlapSpec);

        if (conflictingSessions > 0)
        {
            throw new Exception(
                $"Collision Detected! Hall {hall.Name} is already " +
                $"booked during this time range."
            );
        }

        var session = new Session
        {
            MovieId = dto.MovieId,
            HallId = dto.HallId,
            StartTime = dto.StartTime,
            EndTime = endTime
        };
        await sessionRepository.AddAsync(session);

        return MapToDto(session);
    }

    public async Task<ReadSessionDto?> UpdateSessionAsync(UpdateSessionDto dto)
    {
        var session = await sessionRepository.GetByIdAsync(dto.Id);
        if (session == null) return null;

        var movie = await movieRepository.GetByIdAsync(dto.MovieId);
        if (movie == null) return null;

        var newEndTime = dto.StartTime.AddMinutes(movie.Duration);


        var overlapSpec = new SessionOverlapSpec(
                dto.HallId, 
                dto.StartTime, 
                newEndTime, 
                dto.Id
            );

        if (await sessionRepository.CountAsync(overlapSpec) > 0)
        {
            throw new Exception("Time conflict! The new time overlaps " +
                "with another session.");
        }

        var ticketsExist = 
            await ticketRepository.AnyAsync(t => t.Booking.SessionId == session.Id);

        if (ticketsExist)
        {
            throw new Exception("Cannot update session: tickets already " +
                "sold");
        }


        session.MovieId = dto.MovieId;
        session.HallId = dto.HallId;
        session.StartTime = dto.StartTime;
        session.EndTime = newEndTime;

        await sessionRepository.UpdateAsync(session);

        return MapToDto(session);
    }

    public async Task<ReadSessionDto?> GetSessionByIdAsync(int id)
    {
        var session = await sessionRepository.GetFirstBySpecAsync(
                new SessionWithDetailsByIdSpec(id)
            );
        return session == null ? null : MapToDto(session);
    }

    public async Task<List<ReadSessionDto>> GetAllSessionsAsync()
    {
        var sessions = await sessionRepository.GetListBySpecAsync(
                new SessionsWithDetailsSpec()
            );
        return sessions.Select(MapToDto).ToList();
    }

    public async Task DeleteSessionAsync(int id)
    {
        await sessionRepository.DeleteAsync(id);
    }

    public async Task<List<SeatStatusDto>> GetSeatsBySessionAsync(
            int sessionId
        )
    {
        var session = await sessionRepository.GetByIdAsync(sessionId);
        if (session == null) throw new Exception("Session not found");

        var seats = await seatRepository.GetListBySpecAsync(
            new SeatsByHallIdSpec(session.HallId)
        );

        var reservedTickets = await ticketRepository.GetListBySpecAsync(
            new ActiveTicketsForSeatsBySessionIdSpec(
                    sessionId, seats.Select(s => s.Id).ToList()
                )
        );

        var reservedSeatIds = reservedTickets
                                .Select(t => t.SeatId).ToHashSet();


        return seats.Select(s => new SeatStatusDto
        {
            Id = s.Id,
            RowNumber = s.RowNumber,
            SeatNumber = s.SeatNumber,
            SeatType = s.SeatType.ToString(),
            IsReserved = reservedSeatIds.Contains(s.Id)
        }).ToList();
    }


    private static ReadSessionDto MapToDto(Session s)
    {
        return new ReadSessionDto
        {
            Id = s.Id,
            MovieId = s.MovieId,
            HallName = s.Hall.Name,
            HallFormat = s.Hall.Format.ToString(),
            StartTime = s.StartTime,
            EndTime = s.EndTime
        };
    }
}