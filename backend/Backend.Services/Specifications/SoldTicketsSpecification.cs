using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications;

public class SoldTicketsSpecification : Specification<Ticket>
{
    public SoldTicketsSpecification()
    {
        Query
            .Include(t => t.Booking)
            .Where(t => t.Booking.Status == BookingStatus.CONFIRMED);
    }
}