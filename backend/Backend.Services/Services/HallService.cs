using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Hall;
using Backend.Services.Interfaces;

namespace Backend.Services.Services;

public class HallService(IRepository<Hall> hallRepository) : IHallService
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

                // Walkways in ui ???
                if (seatChar == '_') continue;

                var type = seatChar switch
                {
                    'V' => SeatType.VIP,
                    'P' => SeatType.PREMIUM,
                    _  => SeatType.REGULAR,
                };

                hall.Seats.Add(new Seat
                {
                    RowNumber = actualRowNumber,
                    SeatNumber = c + 1,
                    SeatType = type,
                    IsReserved = false
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
        await hallRepository.DeleteAsync(id);
        
    }
}