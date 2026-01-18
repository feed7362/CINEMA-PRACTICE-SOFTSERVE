using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Session : IEntity
{
    public int Id { get; set; }

    public int MovieId { get; set; }

    public int HallId { get; set; }

    public DateTime StartTime { get; set; } = DateTime.UtcNow;

    public DateTime EndTime { get; set; }

    public Movie Movie { get; set; } = null!;
    public Hall Hall { get; set; } = null!;

    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    public ICollection<Price> Prices { get; set; } = new List<Price>();
}
