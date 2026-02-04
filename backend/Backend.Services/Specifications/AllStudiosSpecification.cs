using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications;

public sealed class AllStudiosSpec : Specification<Studio>
{
    public AllStudiosSpec()
    {
        Query.OrderBy(x => x.Name);
    }
}