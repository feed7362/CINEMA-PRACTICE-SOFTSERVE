using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications
{
    public class SessionOverlapSpec : Specification<Session>
    {
        public SessionOverlapSpec(
                int hallId,
                DateTime newStart,
                DateTime newEnd
            )
        {
            Query
                .Where(s => s.HallId == hallId)
                .Where(s => s.StartTime < newEnd && s.EndTime > newStart);
        }

        public SessionOverlapSpec(
                int? hallId,
                DateTime newStart,
                DateTime newEnd,
                int excludeSessionId
            )
        {
            Query
                .Where(s => s.Id != excludeSessionId)
                .Where(s => s.HallId == hallId)
                .Where(s => s.StartTime < newEnd && s.EndTime > newStart);
        }
    }

    public class SessionsByIdsSpec : Specification<Session>
    {
        public SessionsByIdsSpec(IEnumerable<int> ids)
        {
            Query
                .Include(s => s.Hall)
                .Where(s => ids.Contains(s.Id));
        }
    }

    public class SessionWithDetailsByIdSpec : Specification<Session>
    {
        public SessionWithDetailsByIdSpec(int id)
        {
            Query.Where(s => s.Id == id)
                .Include(s => s.Hall);
        }
    }


    public class SessionsWithDetailsSpec : Specification<Session>
    {
        public SessionsWithDetailsSpec()
        {
            Query.Include(s => s.Hall);
        }
    }
}
    