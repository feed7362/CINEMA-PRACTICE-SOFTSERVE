using Microsoft.AspNetCore.Identity;

namespace Backend.Domain.Entities;

public class ApplicationUser : IdentityUser<int>
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? ProfilePictureUrl { get; set; }
    public ICollection<Booking> Bookings { get; set; } = [];
    public ICollection<MoviePageView> MoviePageViews { get; set; } = [];
}
