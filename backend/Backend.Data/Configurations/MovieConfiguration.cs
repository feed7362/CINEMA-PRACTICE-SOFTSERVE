using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class MovieConfiguration : IEntityTypeConfiguration<Movie>
{
    public void Configure(EntityTypeBuilder<Movie> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasMany(x => x.Sessions)
            .WithOne(x => x.Movie)
            .HasForeignKey(x => x.MovieId);

        builder.HasOne(x => x.Studio)
            .WithMany(x => x.Movies)
            .HasForeignKey(x => x.StudioId);
    }
}
