using Backend.Domain.Entities;
using Ardalis.Specification;

namespace Backend.Services.Specifications;

public class SeatsByHallSpec : Specification<Seat>
{
    public SeatsByHallSpec(int? hallId)
    {
        Query
            .Where(s => s.HallId == hallId);
    }
}