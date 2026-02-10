using Backend.Domain.Interfaces;
using System.Security.Claims;

namespace Backend.API.Context;

public class UserContext(
        IHttpContextAccessor httpContextAccessor
    ) : IUserContext
{
    public string? Email => httpContextAccessor
        .HttpContext?
        .User?
        .FindFirstValue(ClaimTypes.Email);

    public string? UserId => httpContextAccessor
        .HttpContext?
        .User?
        .FindFirstValue(ClaimTypes.NameIdentifier);
}