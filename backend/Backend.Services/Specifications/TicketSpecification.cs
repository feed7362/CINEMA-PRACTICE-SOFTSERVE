using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications
{
    public class TicketsByUserIdPagedSpec : Specification<Ticket>
    {
        public TicketsByUserIdPagedSpec(int userId, int page, int pageSize)
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

    public class TicketByIdAndUserIdSpec : Specification<Ticket>
    {
        public TicketByIdAndUserIdSpec(int ticketId, int userId)
        {
            Query
                .Where(t => t.Id == ticketId 
                            && t.Booking.ApplicationUserId == userId)
                .Include(t => t.Seat)
                .Include(t => t.Booking)
                .ThenInclude(b => b.Session)
                .ThenInclude(s => s.Movie)
                .Include(t => t.Booking)
                .ThenInclude(b => b.Session)
                .ThenInclude(s => s.Hall);
        }
    }

    public class ActiveTicketsForSeatsBySessionIdSpec : Specification<Ticket>
    {
        public ActiveTicketsForSeatsBySessionIdSpec(int sessionId, List<int> seatIds)
        {
            Query
                .Include(t => t.Booking)
                .Where(t => t.Booking.SessionId == sessionId)
                .Where(t => seatIds.Contains(t.SeatId))
                .Where(t =>
                    t.Booking.Status == BookingStatus.CONFIRMED ||
                    (
                        t.Booking.Status == BookingStatus.PENDING 
                        && t.Booking.ExpirationTime > DateTime.UtcNow
                    )
                );
        }
    }
    

    public class ReservedSeatsBySessionIdSpec : Specification<Ticket>
    {
        public ReservedSeatsBySessionIdSpec(int sessionId)
        {
            Query
                .Where(t => t.Booking.SessionId == sessionId)
                .Include(t => t.Seat); 
        }
    }

    public class SoldTicketsSpec : Specification<Ticket>
    {
        public SoldTicketsSpec()
        {
            Query
                .Include(t => t.Booking)
                .Where(t => t.Booking.Status == BookingStatus.CONFIRMED);
        }
    }
}