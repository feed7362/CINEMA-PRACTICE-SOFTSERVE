using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum SeatType : short
{
    REGULAR = 0,
    PREMIUM = 1,
    VIP = 2
}

public class Seat : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int HallId { get; set; }
    
    [Required]
    [Column(TypeName = "smallint")]
    public SeatType SeatType { get; set; }  = SeatType.REGULAR;

    [Required]
    [Range(1, 100)]
    public int SeatNumber { get; set; }
    
    [Required]
    [Range(1, 100)]
    public int RowNumber { get; set; }
    
    [Required]
    public bool IsReserved { get; set; }

    public Hall Hall { get; set; } = null!;
}