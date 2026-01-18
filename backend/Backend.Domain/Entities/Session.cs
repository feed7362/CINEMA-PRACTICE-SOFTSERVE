using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Session : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int MovieId { get; set; }
    
    [Required]
    public int HallId { get; set; }
    
    [Required]
    public DateTime StartTime { get; set; } = DateTime.UtcNow;
    
    [Required]
    public DateTime EndTime { get; set; }

    public Movie Movie { get; set; } = null!;
    public Hall Hall { get; set; } = null!;

    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    public ICollection<Price> Prices { get; set; } = new List<Price>();
}
