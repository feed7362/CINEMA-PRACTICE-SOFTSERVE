using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }
    
    [Required]
    public int SessionId { get; set; }

    [Required]
    public DateTime BookingTime { get; set; }
    
    [Required]
    public DateTime ExpirationTime { get; set; }

    [Required]
    [Column(TypeName = "smallint")]
    public BookingStatus Status { get; set; } = BookingStatus.PENDING;


    public Session Session { get; set; } = null!;

    public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
