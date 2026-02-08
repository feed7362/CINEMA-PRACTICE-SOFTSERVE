using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications
{
    public class StudiosByFilterSpec : Specification<Studio>
    {
        public StudiosByFilterSpec(string? searchTerm)
        {
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                Query.Where(s => s.Name.Contains(searchTerm));
            }

            Query.OrderBy(s => s.Name);
        }
    }

    public class StudiosByFilterPagedSpec : StudiosByFilterSpec
    {
        public StudiosByFilterPagedSpec(string? searchTerm, int pageNumber, int pageSize)
            : base(searchTerm)
        {
            Query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);
        }
    }
}
