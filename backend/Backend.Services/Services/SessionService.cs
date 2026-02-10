using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
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
        IRepository<Seat> seatRepository,
        IMapper mapper
    )
    : ISessionService
{
    public async Task<ReadSessionDto> CreateSessionAsync(CreateSessionDto dto)
    {
        var movie = await movieRepository.GetByIdAsync(dto.MovieId)
            ?? throw new EntityNotFoundException("Фільм", dto.MovieId);

        var hall = await hallRepository.GetByIdAsync(dto.HallId)
            ?? throw new EntityNotFoundException("Зал", dto.HallId);


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
            throw new ConflictException($"Колізія! Зал '{hall.Name}'" +
                $" уже заброньований на цей час.");
        }

        var session = mapper.Map<Session>(dto);
        session.EndTime = endTime;

        await sessionRepository.AddAsync(session);

        return mapper.Map<ReadSessionDto>(session);
    }

    public async Task<ReadSessionDto?> UpdateSessionAsync(UpdateSessionDto dto)
    {
        var session = await sessionRepository.GetByIdAsync(dto.Id)
        ?? throw new EntityNotFoundException("Сеанс", dto.Id);

        var movieId = dto.MovieId ?? session.MovieId;
        var movie = await movieRepository.GetByIdAsync(movieId)
            ?? throw new EntityNotFoundException("Фільм", movieId);

        var hallId = dto.HallId ?? session.HallId;
        var hall = await hallRepository.GetByIdAsync(hallId)
            ?? throw new EntityNotFoundException("Зал", hallId);

        var newEndTime = dto.StartTime.AddMinutes(movie.Duration);


        var overlapSpec = new SessionOverlapSpec(
                dto.HallId, 
                dto.StartTime, 
                newEndTime, 
                dto.Id
            );

        if (await sessionRepository.CountAsync(overlapSpec) > 0)
        {
            throw new ConflictException($"Конфлікт! Зал '{hall.Name}'" +
                $" зайнятий іншим сеансом у цей час.");
        }

        var ticketsExist = 
            await ticketRepository.AnyAsync(t => t.Booking.SessionId == session.Id);

        if (ticketsExist)
        {
            throw new ConflictException("Оновлення заборонено: " +
                "на цей сеанс уже куплені квитки.");
        }


        mapper.Map(dto, session);
        session.MovieId = movieId;
        session.HallId = hallId;
        session.EndTime = newEndTime;

        await sessionRepository.UpdateAsync(session);

        return await GetSessionByIdAsync(session.Id);
    }

    public async Task<ReadSessionDto?> GetSessionByIdAsync(int id)
    {
        var session = await sessionRepository.GetFirstBySpecAsync(
                new SessionWithDetailsByIdSpec(id)
            )
            ?? throw new EntityNotFoundException("Сеанс", id);

        return mapper.Map<ReadSessionDto>(session);
    }

    public async Task<List<ReadSessionDto>> GetAllSessionsAsync()
    {
        var sessions = await sessionRepository.GetListBySpecAsync(
                new SessionsWithDetailsSpec()
            );
        return mapper.Map<List<ReadSessionDto>>(sessions);
    }

    public async Task<ReadSessionDto?> DeleteSessionAsync(int id)
    {
        var session = await sessionRepository.GetByIdAsync(id)
            ?? throw new EntityNotFoundException("Сеанс", id);

        if (await ticketRepository.AnyAsync(t => t.Booking.SessionId == id))
        {
            throw new ConflictException("Неможливо видалити сеанс: " +
                "на нього вже продано квитки.");
        }

        await sessionRepository.DeleteAsync(session);

        return mapper.Map<ReadSessionDto>(session);
    }

    public async Task<List<SeatStatusDto>> GetSeatsBySessionAsync(
            int sessionId
        )
    {
        var session = await sessionRepository.GetByIdAsync(sessionId)
            ?? throw new EntityNotFoundException("Сеанс", sessionId);

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
}