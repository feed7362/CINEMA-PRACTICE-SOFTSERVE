using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class HallConfiguration : IEntityTypeConfiguration<Hall>
{
    public void Configure(EntityTypeBuilder<Hall> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasMany(x => x.Seats)
            .WithOne(x => x.Hall)
            .HasForeignKey(x => x.HallId);
    }
}
