using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class ErrorLogConfiguration : IEntityTypeConfiguration<ErrorLog>
{
    public void Configure(EntityTypeBuilder<ErrorLog> builder)
    {
        builder.ToTable("ErrorLogs");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Message)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(e => e.StackTrace)
            .HasColumnType("text");

        builder.Property(e => e.Path)
            .HasMaxLength(500);

        builder.Property(e => e.Method)
            .HasMaxLength(10);

        builder.Property(e => e.UserEmail)
            .HasMaxLength(256);

        builder.Property(e => e.Timestamp)
            .IsRequired();

        builder.HasIndex(e => e.Timestamp);
    }
}