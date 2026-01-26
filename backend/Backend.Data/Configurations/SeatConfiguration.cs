using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class SeatConfiguration : IEntityTypeConfiguration<Seat>
{
    public void Configure(EntityTypeBuilder<Seat> builder)
    {
        builder.HasKey(s => s.Id);

        builder.Property(s => s.Id)
            .ValueGeneratedOnAdd();

        builder.Property(s => s.HallId)
            .IsRequired();

        builder.Property(s => s.SeatType)
            .HasConversion<string>()
            .IsRequired()
            .HasDefaultValue(SeatType.REGULAR);

        builder.Property(s => s.SeatNumber)
            .IsRequired();

        builder.Property(s => s.RowNumber)
            .IsRequired();

        builder.Property(s => s.IsReserved)
            .IsRequired();

        builder.HasOne(s => s.Hall)
            .WithMany(h => h.Seats)
            .HasForeignKey(s => s.HallId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasCheckConstraint("CK_Seat_RowNumber", "\"RowNumber\" >= 1 AND \"RowNumber\" <= 100");
        builder.HasCheckConstraint("CK_Seat_SeatNumber", "\"SeatNumber\" >= 1 AND \"SeatNumber\" <= 100");

    }
}