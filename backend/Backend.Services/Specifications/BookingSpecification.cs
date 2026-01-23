using Ardalis.Specification;
using Backend.Domain.Entities;
namespace Backend.Services.Specifications
{
    public static class BookingSpecification
    {
        public class BookingByUserIdAndUserId : Specification<Booking>
        {
            public BookingByUserIdAndUserId(int bookingId, int userId)
            {
                Query
                    .Where(b => b.Id == bookingId && b.ApplicationUserId == userId)
                    .Include(b => b.Session)
                        .ThenInclude(s => s.Movie)
                    .Include(b => b.Session)
                        .ThenInclude(s => s.Hall)
                    .Include(b => b.Tickets)
                        .ThenInclude(t => t.Seat)
                    .Include(b => b.Tickets)
                        .ThenInclude(t => t.Price);
            }
        }

        public class SeatsByListIdsSpec : Specification<Seat>
        {
            public SeatsByListIdsSpec(List<int> seatIds)
            {
                Query
                    .Where(s => seatIds.Contains(s.Id));
            }
        }

        public class SessionWithPricesByIdSpec : Specification<Session>
        {
            public SessionWithPricesByIdSpec(int sessionId)
            {
                Query
                    .Where(s => s.Id == sessionId)
                    .Include(s => s.Prices);
            }
        }

        public class DiscountByTypeSpec : Specification<Discount>
        {
            public DiscountByTypeSpec(DiscountType type)
            {
                Query.Where(d => d.Type == type && d.IsActive);
            }
        }

        public class BookingWithDetailsByIdSpec : Specification<Booking>
        {
            public BookingWithDetailsByIdSpec(int bookingId, int userId)
            {
                Query
                    .Where(b => b.Id == bookingId && b.ApplicationUserId == userId)
                    .Include(b => b.Session)
                        .ThenInclude(s => s.Movie)
                    .Include(b => b.Session)
                        .ThenInclude(s => s.Hall)
                    .Include(b => b.Tickets)
                        .ThenInclude(t => t.Seat)
                    .Include(b => b.Tickets)
                        .ThenInclude(t => t.Discount);
            }
        }
    }
}