using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Hall;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Services;

public class HallService(IRepository<Hall> hallRepository, IRepository<Session> sessionRepository) : IHallService
{
    public async Task<ReadHallDto> CreateHallAsync(CreateHallDto dto)
    {
        var hall = new Hall
        {
            Name = dto.Name,
            Format = (HallFormat)dto.Format,
            Seats = new List<Seat>()
        };

        for (var r = 0; r < dto.SeatMap.Count; r++)
        {
            var rowString = dto.SeatMap[r];
            var actualRowNumber = r + 1;

            for (var c = 0; c < rowString.Length; c++)
            {
                var seatChar = rowString[c];

                var type = seatChar switch
                {
                    'V' => SeatType.Vip,
                    _ => SeatType.Regular,
                };

                hall.Seats.Add(new Seat
                {
                    RowNumber = actualRowNumber,
                    SeatNumber = c + 1,
                    SeatType = type
                });
            }
        }

        hall.Capacity = hall.Seats.Count;
        await hallRepository.AddAsync(hall);

        return new ReadHallDto
        {
            Id = hall.Id,
            Name = hall.Name,
            Capacity = hall.Seats.Count,
            Format = hall.Format.ToString()
        };
    }

    public async Task<ReadHallDto?> UpdateHallAsync(UpdateHallDto dto)
    {
        var hall = await hallRepository.GetByIdAsync(dto.Id);
        if (hall == null) return null;

        hall.Name = dto.Name;
        hall.Format = (HallFormat)dto.Format;

        if (dto.SeatMap.Count > 0)
        {
            hall.Seats.Clear();

            for (var r = 0; r < dto.SeatMap.Count; r++)
            {
                var rowString = dto.SeatMap[r];
                for (var c = 0; c < rowString.Length; c++)
                {
                    hall.Seats.Add(new Seat
                    {
                        RowNumber = r + 1,
                        SeatNumber = c + 1,
                        SeatType = rowString[c] == 'V' ? SeatType.Vip : SeatType.Regular
                    });
                }
            }

            hall.Capacity = hall.Seats.Count;
        }

        await hallRepository.UpdateAsync(hall);

        return new ReadHallDto
        {
            Id = hall.Id,
            Name = hall.Name,
            Format = hall.Format.ToString(),
            Capacity = hall.Capacity
        };
    }

    public async Task<ReadHallDto?> GetHallByIdAsync(int id)
    {
        var hall = await hallRepository.GetByIdAsync(id);

        if (hall == null) return null;

        return new ReadHallDto
        {
            Id = hall.Id,
            Name = hall.Name,
            Capacity = hall.Capacity,
            Format = hall.Format.ToString()
        };
    }

    public async Task<List<ReadHallDto>> GetAllHallsAsync()
    {
        var halls = await hallRepository.GetAllAsync();

        return halls.Select(h => new ReadHallDto
        {
            Id = h.Id,
            Name = h.Name,
            Format = h.Format.ToString(),
            Capacity = h.Capacity
        }).ToList();
    }

    public async Task DeleteHallAsync(int id)
    {
        //Soft delete cause sql blocks this to prevent data corruption(ticket and seats relations)
        var hall = await hallRepository.GetByIdAsync(id);
        if (hall == null) return;

        var hasActiveBookings = await sessionRepository.AnyAsync(s =>
            s.HallId == id && s.EndTime > DateTime.UtcNow);

        if (hasActiveBookings)
        {
            throw new Exception("Неможливо видалити зал: є заплановані сессії");
        }

        hall.IsDeleted = true;
        await hallRepository.UpdateAsync(hall);
    }
}