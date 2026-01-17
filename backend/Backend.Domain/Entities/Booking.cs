using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Booking : IEntity
{
    public long Id { get; set; }

    public long UserId { get; set; }
    public long SessionId { get; set; }

    public DateTime BookingTime { get; set; }
    public DateTime ExpirationTime { get; set; }

    public string Status { get; set; } = "PENDING";

    public User User { get; set; } = null!;
    public Session Session { get; set; } = null!;

    public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
