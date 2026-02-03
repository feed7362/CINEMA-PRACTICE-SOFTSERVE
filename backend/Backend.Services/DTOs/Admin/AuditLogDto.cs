namespace Backend.Services.DTOs.Admin;
public record AuditLogDto(
    int Id,
    string TableName,
    string Action,
    string UserEmail,
    DateTime Timestamp,
    object Changes
);

