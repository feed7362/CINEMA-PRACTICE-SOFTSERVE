using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text.Json;

namespace Backend.Data.Helpers;
public class AuditEntry
{
    public AuditEntry(EntityEntry entry)
    {
        Entry = entry;
    }

    public EntityEntry Entry { get; }
    public string UserEmail { get; set; } = string.Empty;
    public string TableName { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public Dictionary<string, object?> KeyValues { get; } = new();
    public Dictionary<string, object?> OldValues { get; } = new();
    public Dictionary<string, object?> NewValues { get; } = new();
    public List<string> ChangedColumns { get; } = new();

    public AuditLog ToAuditLog()
    {
        var audit = new AuditLog
        {
            UserEmail = UserEmail,
            Action = Action,
            TableName = TableName,
            Timestamp = DateTime.UtcNow,
            // JSONB payload
            Changes = JsonSerializer.Serialize(new
            {
                keys = KeyValues,
                old = OldValues.Count == 0 ? null : OldValues,
                @new = NewValues.Count == 0 ? null : NewValues,
                changed = ChangedColumns.Count == 0 ? null : ChangedColumns
            })
        };
        return audit;
    }
}