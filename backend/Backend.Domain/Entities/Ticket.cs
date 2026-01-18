using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Ticket : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int SeatId { get; set; }
    
    [Required]
    public int BookingId { get; set; }
    
    [Required]
    public int PriceId { get; set; }
    
    [Required]
    public int DiscountId { get; set; }

    [Required]
    public DateTime PurchaseTime { get; set; } = DateTime.UtcNow;
    
    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal FinalPrice { get; set; }

    public Seat Seat { get; set; } = null!;
    public Booking Booking { get; set; } = null!;
    public Price Price { get; set; } = null!;
    public Discount? Discount { get; set; }
}
