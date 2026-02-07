using Backend.Domain.Entities;
using Ardalis.Specification;

namespace Backend.Services.Specifications;

public class SeatsByHallIdSpec : Specification<Seat>
{
    public SeatsByHallIdSpec(int? hallId)
    {
        Query
            .Where(s => s.HallId == hallId);
    }
}