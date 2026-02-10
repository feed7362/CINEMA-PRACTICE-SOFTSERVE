using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
    public void Configure(EntityTypeBuilder<Ticket> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Id)
            .ValueGeneratedOnAdd();

        builder.Property(t => t.SeatId)
            .IsRequired();

        builder.Property(t => t.BookingId)
            .IsRequired();

        builder.Property(t => t.PriceId)
            .IsRequired();

        builder.Property(t => t.DiscountId)
            .IsRequired(false);

        builder.Property(t => t.PurchaseTime)
            .IsRequired()
            .HasDefaultValueSql("CURRENT_TIMESTAMP AT TIME ZONE 'UTC'");

        builder.Property(t => t.FinalPrice)
            .IsRequired()
            .HasColumnType("decimal(10,2)");

        builder.HasOne(t => t.Seat)
            .WithMany()
            .HasForeignKey(t => t.SeatId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(t => t.Booking)
            .WithMany(b => b.Tickets)
            .HasForeignKey(t => t.BookingId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(t => t.Price)
            .WithMany()
            .HasForeignKey(t => t.PriceId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(t => t.Discount)
            .WithMany()
            .HasForeignKey(t => t.DiscountId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}