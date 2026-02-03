using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class ErrorLog : IEntity
{
    public int Id { get; set; }
    public required string Message { get; set; }
    public string? StackTrace { get; set; }
    public string? Path { get; set; }
    public string? UserEmail { get; set; }
    public DateTime Timestamp { get; set; }
    public string? Method { get; set; }
}