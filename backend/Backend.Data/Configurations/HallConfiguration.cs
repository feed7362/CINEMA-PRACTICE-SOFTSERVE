using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class HallConfiguration : IEntityTypeConfiguration<Hall>
{
   public void Configure(EntityTypeBuilder<Hall> builder)
{
    builder.HasKey(h => h.Id);

    builder.Property(h => h.Id)
        .ValueGeneratedOnAdd();

    builder.Property(h => h.Format)
        .HasConversion<string>()
        .IsRequired()
        .HasDefaultValue(HallFormat.REGULAR);

    builder.Property(h => h.Name)
        .IsRequired()
        .HasMaxLength(50)
        .HasColumnType("varchar(50)");

    builder.Property(h => h.Capacity)
        .IsRequired();

    builder.HasMany(h => h.Seats)
        .WithOne(s => s.Hall)
        .HasForeignKey(s => s.HallId)
        .OnDelete(DeleteBehavior.Cascade);
}
}