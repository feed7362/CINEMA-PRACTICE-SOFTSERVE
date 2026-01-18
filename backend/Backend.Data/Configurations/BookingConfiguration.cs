using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class BookingConfiguration : IEntityTypeConfiguration<Booking>
{
    public void Configure(EntityTypeBuilder<Booking> builder)
    {
        builder.HasKey(b => b.Id);

        builder.Property(b => b.Id)
            .ValueGeneratedOnAdd();

        builder.Property(b => b.ApplicationUserId)
            .IsRequired();

        builder.Property(b => b.SessionId)
            .IsRequired();

        builder.Property(b => b.BookingTime)
            .IsRequired();

        builder.Property(b => b.ExpirationTime)
            .IsRequired();

        builder.Property(b => b.Status)
            .HasConversion<short>()
            .HasColumnType("smallint")
            .IsRequired()
            .HasDefaultValue(BookingStatus.PENDING);

        builder.HasOne(b => b.Session)
            .WithMany(s => s.Bookings)
            .HasForeignKey(b => b.SessionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(b => b.Tickets)
            .WithOne(t => t.Booking)
            .HasForeignKey(t => t.BookingId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}