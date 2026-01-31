using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class PriceConfiguration : IEntityTypeConfiguration<Price>
{
    public void Configure(EntityTypeBuilder<Price> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.Property(p => p.SessionId)
            .IsRequired();

        builder.Property(p => p.SeatType)
            .HasConversion<short>()
            .HasColumnType("smallint")
            .IsRequired()
            .HasDefaultValue(SeatType.Regular);

        builder.Property(p => p.Value)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.HasOne(p => p.Session)
            .WithMany(s => s.Prices)
            .HasForeignKey(p => p.SessionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}