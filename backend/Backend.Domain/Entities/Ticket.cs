using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Ticket : IEntity
{
    public int Id { get; set; }

    public int SeatId { get; set; }

    public int BookingId { get; set; }

    public int PriceId { get; set; }

    public int? DiscountId { get; set; }

    public DateTime PurchaseTime { get; set; } = DateTime.UtcNow;

    public decimal FinalPrice { get; set; }

    public Seat Seat { get; set; } = null!;
    public Booking Booking { get; set; } = null!;
    public Price Price { get; set; } = null!;
    public virtual Discount? Discount { get; set; }
    
}
