namespace Backend.Domain.Interfaces;

public interface IUserContext
{
    string? Email { get; }
    string? UserId { get; }
}