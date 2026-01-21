using Ardalis.Specification;

namespace Backend.Services.Specifications;

public class SessionWithDetailsSpec : Specification<Domain.Entities.Session>
{
    public SessionWithDetailsSpec(int id)
    {
        Query
            .Where(s => s.Id == id)
            .Include(s => s.Movie)
            .Include(s => s.Hall);
    }
}

public class UpcomingSessionsSpec : Specification<Domain.Entities.Session>
{
    public UpcomingSessionsSpec()
    {
        Query
            .Where(s => s.StartTime > DateTime.UtcNow)
            .Include(s => s.Movie)
            .OrderBy(s => s.StartTime);
    }
}