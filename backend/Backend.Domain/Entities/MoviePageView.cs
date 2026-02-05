using System;
using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class MoviePageView : IEntity
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;

    public int MovieId { get; set; }
    public Movie Movie { get; set; } = null!;

    public int ViewCount { get; set; } = 1;
    public DateTime LastViewedAt { get; set; }
}