using System;
using System.Collections.Generic;
using System.Text;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Data.Configurations;

public class MoviePageViewConfiguration : IEntityTypeConfiguration<MoviePageView>
{
    public void Configure(EntityTypeBuilder<MoviePageView> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.ViewCount)
            .IsRequired()
            .HasDefaultValue(1);

        builder.Property(x => x.LastViewedAt)
            .IsRequired();

        builder.HasOne(x => x.User)
            .WithMany(u => u.MoviePageViews)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Movie)
            .WithMany()
            .HasForeignKey(x => x.MovieId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => new { x.UserId, x.MovieId })
            .IsUnique();
    }
}
