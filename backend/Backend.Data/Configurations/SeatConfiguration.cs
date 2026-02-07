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
            .HasConversion<short>()
            .HasColumnType("smallint")
            .IsRequired()
            .HasDefaultValue(SeatType.Regular);

        builder.Property(s => s.SeatNumber)
            .IsRequired();

        builder.Property(s => s.RowNumber)
            .IsRequired();

        builder.HasOne(s => s.Hall)
            .WithMany(h => h.Seats)
            .HasForeignKey(s => s.HallId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.ToTable(t =>
        {
            t.HasCheckConstraint(
                "CK_Seat_RowNumber", 
                "\"RowNumber\" >= 1 AND \"RowNumber\" <= 100"
            );
            t.HasCheckConstraint(
                "CK_Seat_SeatNumber", 
                "\"SeatNumber\" >= 1 AND \"SeatNumber\" <= 100"
            );
        });
    }
}