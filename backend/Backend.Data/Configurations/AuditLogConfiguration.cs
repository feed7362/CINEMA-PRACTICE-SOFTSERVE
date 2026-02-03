using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
{
    public void Configure(EntityTypeBuilder<AuditLog> builder)
    {
        builder.ToTable("AuditLogs");
        builder.HasKey(a => a.Id);

        builder.Property(a => a.Changes)
            .HasColumnType("jsonb")
            .IsRequired();

        builder.Property(a => a.TableName)
            .HasMaxLength(100)
            .IsRequired();
        builder.Property(a => a.UserEmail)
            .HasMaxLength(256)
            .IsRequired();

        builder.HasIndex(a => a.Timestamp);
        builder.HasIndex(a => a.TableName);
    }
}