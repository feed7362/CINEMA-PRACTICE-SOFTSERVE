using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications;

public class SessionsByIdsSpec : Specification<Session>
{
    public SessionsByIdsSpec(IEnumerable<int> ids)
    {
        Query
            .Include(s => s.Hall)
            .Where(s => ids.Contains(s.Id));
    }
}