using Ardalis.Specification;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications
{
    public class DiscountByCodeSpec 
        : Specification<Discount>, ISingleResultSpecification<Discount>
    {
        public DiscountByCodeSpec(string? code)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                Query.Where(d => false);
            }
            else
            {
                Query.Where(d => d.Code == code.ToUpper() && d.IsActive);
            }
        }
    }

    public class ActiveDiscountsSpec : Specification<Discount>
    {
        public ActiveDiscountsSpec()
        {
            Query.Where(d => d.IsActive);
        }
    }
}

