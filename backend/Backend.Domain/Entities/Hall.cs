using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum HallFormat : short
{
    REGULAR = 0,
    IMAX = 1,
    _3D = 2
}

public class Hall : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "smallint")]
    public HallFormat Format { get; set; } = HallFormat.REGULAR;
    
    [Required]
    [MaxLength(50)]
    [Column(TypeName = "varchar(50)")]
    public string HallName { get; set; } = null!;

    [Required]
    public int Capacity { get; set; }

    public ICollection<Seat> Seats { get; set; } = new List<Seat>();
}