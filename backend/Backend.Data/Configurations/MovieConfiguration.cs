using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class MovieConfiguration : IEntityTypeConfiguration<Movie>
{
    public void Configure(EntityTypeBuilder<Movie> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Id)
            .ValueGeneratedOnAdd();

        builder.Property(m => m.StudioId)
            .IsRequired();

        builder.Property(m => m.TitleOrg)
            .IsRequired()
            .HasMaxLength(150)
            .HasColumnType("varchar(150)");

        builder.Property(m => m.TitleUkr)
            .IsRequired()
            .HasMaxLength(150)
            .HasColumnType("varchar(150)");

        builder.Property(m => m.Description)
            .HasColumnType("text");

        builder.Property(m => m.Duration)
            .IsRequired();

        builder.Property(m => m.ReleaseDate)
            .IsRequired();
        builder.Property(m => m.FinishDate)
            .IsRequired();

        builder.Property(m => m.AgeRating)
            .HasConversion<short>()
            .HasColumnType("smallint")
            .IsRequired()
            .HasDefaultValue(AgeRating._0Plus);

        builder.Property(m => m.ImdbRating)
            .HasColumnType("decimal(3,1)");

        builder.Property(m => m.Director)
            .HasMaxLength(100)
            .HasColumnType("varchar(100)");

        builder.Property(m => m.Country)
            .HasMaxLength(100)
            .HasColumnType("varchar(100)");

        builder.Property(m => m.Subtitles)
            .IsRequired();

        builder.Property(m => m.ImageUrl)
            .HasColumnType("text");

        builder.Property(m => m.TrailerUrl)
            .HasColumnType("text");

        builder.HasOne(m => m.Studio)
            .WithMany(s => s.Movies)
            .HasForeignKey(m => m.StudioId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(m => m.Sessions)
            .WithOne(s => s.Movie)
            .HasForeignKey(s => s.MovieId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(m => m.MovieActors)
            .WithOne(ma => ma.Movie)
            .HasForeignKey(ma => ma.MovieId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(m => m.MovieGenres)
            .WithOne(mg => mg.Movie)
            .HasForeignKey(mg => mg.MovieId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.ToTable(t =>
        {
            t.HasCheckConstraint(
                "CK_Movie_Duration",
                "\"Duration\" >= 1 AND \"Duration\" <= 600"
            );
            t.HasCheckConstraint(
                "CK_Movie_ImdbRating",
                "\"ImdbRating\" >= 0 AND \"ImdbRating\" <= 10"
            );
        });
    }
}