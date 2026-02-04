using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications
{
    public class AuditLogsFilterSpec : Specification<AuditLog>
    {
        public AuditLogsFilterSpec(string? email = null)
        {
            Query.OrderByDescending(x => x.Timestamp);

            if (!string.IsNullOrWhiteSpace(email))
            {
                Query.Where(x => x.UserEmail.Contains(email));
            }
        }
    }

    public sealed class AuditLogsPagedSpec : AuditLogsFilterSpec
    {
        public AuditLogsPagedSpec(int page, int pageSize, string? email = null)
            : base(email)
        {
            Query.Skip((page - 1) * pageSize).Take(pageSize);
        }
    }

    public class ErrorLogsFilterSpec : Specification<ErrorLog>
    {
        public ErrorLogsFilterSpec(string? email = null, string? path = null)
        {
            Query.OrderByDescending(x => x.Timestamp);

            if (!string.IsNullOrWhiteSpace(email))
            {
                Query.Where(x => x.UserEmail != null && x.UserEmail.Contains(email));
            }

            if (!string.IsNullOrWhiteSpace(path))
            {
                Query.Where(x => x.Path != null && x.Path.Contains(path));
            }
        }
    }

    public sealed class ErrorLogsPagedSpec : ErrorLogsFilterSpec
    {
        public ErrorLogsPagedSpec(int page, int pageSize, string? email = null, string? path = null)
            : base(email, path)
        {
            Query.Skip((page - 1) * pageSize).Take(pageSize);
        }
    }
}