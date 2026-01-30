namespace Backend.Services.DTOs.Auth;

public record RegisterDto
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required string ConfirmPassword { get; init; }
}