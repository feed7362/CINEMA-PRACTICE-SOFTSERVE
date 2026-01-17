using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class SessionConfiguration : IEntityTypeConfiguration<Session>
{
    public void Configure(EntityTypeBuilder<Session> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Hall)
            .WithMany()
            .HasForeignKey(x => x.HallId);

        builder.HasMany(x => x.Prices)
            .WithOne(x => x.Session)
            .HasForeignKey(x => x.SessionId);

        builder.HasMany(x => x.Bookings)
            .WithOne(x => x.Session)
            .HasForeignKey(x => x.SessionId);
    }
}
