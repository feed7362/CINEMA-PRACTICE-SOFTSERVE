using Ardalis.Specification;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications
{
    public class DiscountByCodeSpec : Specification<Discount>, ISingleResultSpecification<Discount>
    {
        public DiscountByCodeSpec(string code)
        {
            Query.Where(d => d.Code == code.ToUpper() && d.IsActive);
        }
    }
}

