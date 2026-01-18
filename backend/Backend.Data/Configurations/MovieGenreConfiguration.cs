using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class MovieGenreConfiguration : IEntityTypeConfiguration<MovieGenre>
{
    public void Configure(EntityTypeBuilder<MovieGenre> builder)
    {
        builder.HasKey(mg => mg.Id);

        builder.Property(mg => mg.Id)
            .ValueGeneratedOnAdd();

        builder.Property(mg => mg.MovieId)
            .IsRequired();

        builder.Property(mg => mg.GenreId)
            .IsRequired();

        builder.HasOne(mg => mg.Movie)
            .WithMany(m => m.MovieGenres)
            .HasForeignKey(mg => mg.MovieId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(mg => mg.Genre)
            .WithMany(g => g.MovieGenres)
            .HasForeignKey(mg => mg.GenreId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(mg => new { mg.MovieId, mg.GenreId })
            .IsUnique();
    }
}