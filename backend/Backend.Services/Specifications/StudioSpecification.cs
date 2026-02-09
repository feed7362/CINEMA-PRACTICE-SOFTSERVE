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
        public StudiosByFilterPagedSpec(string? searchTerm, int? pageNumber, int? pageSize)
            : base(searchTerm)
        {
            var page = pageNumber ?? 1;
            var size = pageSize ?? 100;

            Query
                .Skip((page - 1) * size)
                .Take(size);
        }
    }
}
