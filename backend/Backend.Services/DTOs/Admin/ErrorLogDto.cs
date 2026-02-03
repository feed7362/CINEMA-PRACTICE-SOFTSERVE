namespace Backend.Services.DTOs.Admin;

public record ErrorLogDto(
    int Id,
    string Message,
    string? Path,
    string? UserEmail,
    DateTime Timestamp,
    string? Method
);