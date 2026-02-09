using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Hall;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Services;

public class HallService(
        IRepository<Hall> hallRepository,
        IRepository<Session> sessionRepository,
        IMapper mapper
    ) : IHallService
{
    public async Task<ReadHallDto> CreateHallAsync(CreateHallDto dto)
    {
        var hall = mapper.Map<Hall>(dto);

        hall.Seats = ParseSeatMap(dto.SeatMap);
        hall.Capacity = hall.Seats.Count;

        await hallRepository.AddAsync(hall);

        return mapper.Map<ReadHallDto>(hall);
    }

    public async Task<ReadHallDto?> UpdateHallAsync(UpdateHallDto dto)
    {
        var hall = await hallRepository.GetByIdAsync(dto.Id)
            ?? throw new EntityNotFoundException("Зал", dto.Id);

        hall.Name = dto.Name;
        hall.Format = (HallFormat)dto.Format;

        if (dto.SeatMap is { Count: > 0 })
        {
            hall.Seats.Clear();
            var newSeats = ParseSeatMap(dto.SeatMap);
            foreach (var seat in newSeats)
            {
                hall.Seats.Add(seat);
            }
            hall.Capacity = hall.Seats.Count;
        }

        await hallRepository.UpdateAsync(hall);

        return mapper.Map<ReadHallDto>(hall);
    }

    public async Task<ReadHallDto?> GetHallByIdAsync(int id)
    {
        var hall = await hallRepository.GetByIdAsync(id)
            ?? throw new EntityNotFoundException("Зал", id);

        return mapper.Map<ReadHallDto>(hall);
    }

    public async Task<List<ReadHallDto>> GetAllHallsAsync()
    {
        var halls = await hallRepository.GetAllAsync();
        return mapper.Map<List<ReadHallDto>>(halls);
    }

    public async Task<ReadHallDto?> DeleteHallAsync(int id)
    {
        //Soft delete cause sql blocks this to prevent data
        //corruption(ticket and seats relations)
        var hall = await hallRepository.GetByIdAsync(id)
            ?? throw new EntityNotFoundException("Зал", id);

        var hasActiveBookings = await sessionRepository.AnyAsync(s =>
            s.HallId == id && s.EndTime > DateTime.UtcNow);

        if (hasActiveBookings)
        {
            throw new ConflictException("Неможливо видалити зал:" +
                " у ньому є заплановані або активні сеанси.");
        }

        hall.IsDeleted = true;
        await hallRepository.UpdateAsync(hall);

        return mapper.Map<ReadHallDto>(hall);
    }

    private List<Seat> ParseSeatMap(List<string> seatMap)
    {
        var seats = new List<Seat>();
        for (var r = 0; r < seatMap.Count; r++)
        {
            var rowString = seatMap[r];
            for (var c = 0; c < rowString.Length; c++)
            {
                seats.Add(new Seat
                {
                    RowNumber = r + 1,
                    SeatNumber = c + 1,
                    SeatType = rowString[c] == 'V' 
                     ? SeatType.Vip 
                     : SeatType.Regular
                });
            }
        }
        return seats;
    }
}