using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Ticket : IEntity
{
    public long Id { get; set; }

    public long SeatId { get; set; }
    public long BookingId { get; set; }
    public long PriceId { get; set; }
    public long? DiscountId { get; set; }

    public DateTime PurchaseTime { get; set; }
    public decimal FinalPrice { get; set; }

    public Seat Seat { get; set; } = null!;
    public Booking Booking { get; set; } = null!;
    public Price Price { get; set; } = null!;
    public Discount? Discount { get; set; }
}
