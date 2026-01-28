using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum BookingStatus : short
{
    PENDING = 0,
    CONFIRMED = 1,
    CANCELED = 2
}


public class Booking : IEntity
{
    public int Id { get; set; }

    public int ApplicationUserId { get; set; }

    public int SessionId { get; set; }

    public DateTime BookingTime { get; set; }

    public DateTime ExpirationTime { get; set; }

    public BookingStatus Status { get; set; } = BookingStatus.PENDING;

    public Session Session { get; set; } = null!;

    public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    public string? PaymentIntentId { get; set; }
    public DateTime? ConfirmationTime { get; set; }
}
