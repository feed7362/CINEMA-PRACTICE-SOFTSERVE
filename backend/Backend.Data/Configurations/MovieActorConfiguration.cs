using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class MovieActorConfiguration : IEntityTypeConfiguration<MovieActor>
{
    public void Configure(EntityTypeBuilder<MovieActor> builder)
    {
        builder.HasKey(ma => ma.Id);

        builder.Property(ma => ma.Id)
            .ValueGeneratedOnAdd();

        builder.Property(ma => ma.MovieId)
            .IsRequired();

        builder.Property(ma => ma.ActorId)
            .IsRequired();

        builder.HasOne(ma => ma.Movie)
            .WithMany(m => m.MovieActors)
            .HasForeignKey(ma => ma.MovieId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(ma => ma.Actor)
            .WithMany(a => a.MovieActors)
            .HasForeignKey(ma => ma.ActorId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(ma => new { ma.MovieId, ma.ActorId })
            .IsUnique();
    }
}