using Backend.Domain.Interfaces;

public class AuditLog : IEntity
{
    public int Id { get; set; }
    public required string TableName { get; set; }
    public required string Action { get; set; }
    public required string UserEmail { get; set; }
    public DateTime Timestamp { get; set; }
    public required string Changes { get; set; }
}