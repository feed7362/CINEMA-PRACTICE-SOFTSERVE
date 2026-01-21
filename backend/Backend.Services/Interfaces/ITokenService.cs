using Backend.Domain.Entities;

namespace Backend.Services.Interfaces;

public interface ITokenService
{
    string CreateToken(ApplicationUser user, IList<string> roles);
}