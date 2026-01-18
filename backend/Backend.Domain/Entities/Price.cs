using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Price : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int SessionId { get; set; }

    [Required]
    [Column(TypeName = "smallint")]
    public SeatType SeatType { get; set; } = SeatType.REGULAR;
    
    [Required]
    [Column(TypeName = "decimal(5,2)")]
    public decimal Value { get; set; }

    public Session Session { get; set; } = null!;
}
