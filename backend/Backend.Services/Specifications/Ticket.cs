using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications
{
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

    public class GetActiveTicketsForSeatsSpec : Specification<Ticket>
    {
        public GetActiveTicketsForSeatsSpec(int sessionId, List<int> seatIds)
        {
            Query
                .Include(t => t.Booking)
                .Where(t => t.Booking.SessionId == sessionId)
                .Where(t => seatIds.Contains(t.SeatId))
                .Where(t =>
                    t.Booking.Status == BookingStatus.CONFIRMED ||
                    (t.Booking.Status == BookingStatus.PENDING && t.Booking.ExpirationTime > DateTime.UtcNow)
                );
        }
    }
}