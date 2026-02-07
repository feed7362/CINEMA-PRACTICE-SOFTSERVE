using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class SessionConfiguration : IEntityTypeConfiguration<Session>
{
    public void Configure(EntityTypeBuilder<Session> builder)
    {
        builder.HasKey(s => s.Id);

        builder.Property(s => s.Id)
            .ValueGeneratedOnAdd();

        builder.Property(s => s.MovieId)
            .IsRequired();

        builder.Property(s => s.HallId)
            .IsRequired();

        builder.Property(s => s.StartTime)
            .IsRequired()
            .HasDefaultValueSql(
                "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'"
            );

        builder.Property(s => s.EndTime)
            .IsRequired();

        builder.HasOne(s => s.Movie)
            .WithMany(m => m.Sessions)
            .HasForeignKey(s => s.MovieId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(s => s.Hall)
            .WithMany(h => h.Sessions)
            .HasForeignKey(s => s.HallId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(s => s.Bookings)
            .WithOne(b => b.Session)
            .HasForeignKey(b => b.SessionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(s => s.Prices)
            .WithOne(p => p.Session)
            .HasForeignKey(p => p.SessionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}