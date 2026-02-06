using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications;

public class SessionWithDetailsSpec : Specification<Session>
{
    public SessionWithDetailsSpec()
    {
        Query.Include(s => s.Hall);
    }

    public SessionWithDetailsSpec(int id)
    {
        Query.Where(s => s.Id == id)
            .Include(s => s.Hall);
    }
}