using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class SeatConfiguration : IEntityTypeConfiguration<Seat>
{
    public void Configure(EntityTypeBuilder<Seat> builder)
    {
        builder.ToTable("Seats");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.RowNumber)
            .IsRequired();

        builder.Property(x => x.SeatNumber)
            .IsRequired();

        builder.Property(x => x.IsReserved)
            .HasDefaultValue(false);

        // -------- Hall relationship --------
        builder.HasOne(x => x.Hall)
            .WithMany(x => x.Seats)
            .HasForeignKey(x => x.HallId)
            .OnDelete(DeleteBehavior.Cascade);

        // -------- Unique constraint --------
        builder.HasIndex(x => new { x.HallId, x.RowNumber, x.SeatNumber })
            .IsUnique();
    }
}
