using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications
{
    public class AuditLogsByEmailSpec : Specification<AuditLog>
    {
        public AuditLogsByEmailSpec(string? email = null)
        {
            Query.OrderByDescending(x => x.Timestamp);

            if (!string.IsNullOrWhiteSpace(email))
            {
                Query.Where(x => x.UserEmail.Contains(email));
            }
        }
    }

    public sealed class AuditLogsByEmailPagedSpec : AuditLogsByEmailSpec
    {
        public AuditLogsByEmailPagedSpec(
                int page, 
                int pageSize, 
                string? email = null
            )
            : base(email)
        {
            Query.Skip((page - 1) * pageSize).Take(pageSize);
        }
    }

    public class ErrorLogsByEmailAndPathSpec : Specification<ErrorLog>
    {
        public ErrorLogsByEmailAndPathSpec(
                string? email = null, 
                string? path = null
            )
        {
            Query.OrderByDescending(x => x.Timestamp);

            if (!string.IsNullOrWhiteSpace(email))
            {
                Query.Where(x => x.UserEmail != null 
                                    && x.UserEmail.Contains(email));
            }

            if (!string.IsNullOrWhiteSpace(path))
            {
                Query.Where(x => x.Path != null && x.Path.Contains(path));
            }
        }
    }

    public sealed class ErrorLogsByEmailAndPathPagedSpec : ErrorLogsByEmailAndPathSpec
    {
        public ErrorLogsByEmailAndPathPagedSpec(
                int page, 
                int pageSize, 
                string? email = null, 
                string? path = null
            )
            : base(email, path)
        {
            Query.Skip((page - 1) * pageSize).Take(pageSize);
        }
    }
}