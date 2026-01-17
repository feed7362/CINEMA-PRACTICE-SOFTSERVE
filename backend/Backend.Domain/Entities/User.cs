namespace Backend.Domain.Entities;

public class User
{
    public long Id { get; set; }

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string Role { get; set; } = "USER";

    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
    