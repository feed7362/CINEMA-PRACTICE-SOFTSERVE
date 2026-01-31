using Ardalis.Specification;

namespace Backend.Services.Specifications;

public class SessionOverlapSpec : Specification<Domain.Entities.Session>
{
    public SessionOverlapSpec(int hallId, DateTime newStart, DateTime newEnd)
    {
        Query
            .Where(s => s.HallId == hallId)
            .Where(s => s.StartTime < newEnd && s.EndTime > newStart);
    }

    public SessionOverlapSpec(int hallId, DateTime newStart, DateTime newEnd, int excludeSessionId)
    {
        Query
            .Where(s => s.Id != excludeSessionId)
            .Where(s => s.HallId == hallId)
            .Where(s => s.StartTime < newEnd && s.EndTime > newStart);
    }
}