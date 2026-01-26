using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications;

public class UserTicketsPagedSpec : Specification<Ticket>
{
    public UserTicketsPagedSpec(int userId, int page, int pageSize)
    {
        Query
            .Where(t => t.Booking.ApplicationUserId == userId)
            .Include(t => t.Seat)
            .Include(t => t.Booking)
            .ThenInclude(b => b.Session)
            .ThenInclude(s => s.Movie)
            .Include(t => t.Booking)
            .ThenInclude(b => b.Session)
            .ThenInclude(s => s.Hall)
            .OrderByDescending(t => t.PurchaseTime)
            .Skip((page - 1) * pageSize)
            .Take(pageSize);
    }
}

public class TicketByIdAndUserSpec : Specification<Ticket>
{
    public TicketByIdAndUserSpec(int ticketId, int userId)
    {
        Query
            .Where(t => t.Id == ticketId && t.Booking.ApplicationUserId == userId)
            .Include(t => t.Seat)
            .Include(t => t.Booking)
            .ThenInclude(b => b.Session)
            .ThenInclude(s => s.Movie)
            .Include(t => t.Booking)
            .ThenInclude(b => b.Session)
            .ThenInclude(s => s.Hall);
    }
}