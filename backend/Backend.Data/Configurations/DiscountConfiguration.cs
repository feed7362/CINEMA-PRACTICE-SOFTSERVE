using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class DiscountConfiguration : IEntityTypeConfiguration<Discount>
{
    public void Configure(EntityTypeBuilder<Discount> builder)
    {
        builder.HasKey(d => d.Id);

        builder.Property(d => d.Id)
            .ValueGeneratedOnAdd();

        builder.Property(d => d.Type)
            .HasConversion<short>()
            .HasColumnType("smallint")
            .IsRequired();

        builder.Property(d => d.Percentage)
            .IsRequired()
            .HasDefaultValue(0);

        builder.Property(d => d.IsActive)
            .IsRequired();
    }
}