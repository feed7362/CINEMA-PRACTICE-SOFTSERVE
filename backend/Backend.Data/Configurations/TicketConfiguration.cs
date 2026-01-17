using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
    public void Configure(EntityTypeBuilder<Ticket> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Seat)
            .WithMany()
            .HasForeignKey(x => x.SeatId);

        builder.HasOne(x => x.Price)
            .WithMany()
            .HasForeignKey(x => x.PriceId);

        builder.HasOne(x => x.Discount)
            .WithMany()
            .HasForeignKey(x => x.DiscountId)
            .IsRequired(false);
    }
}
