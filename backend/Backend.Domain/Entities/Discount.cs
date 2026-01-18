using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum DiscountType : short
{
    STUDENT = 0,
    MILITARY = 1,
    PROMOCODE = 2
}

public class Discount : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "smallint")]
    public DiscountType Type { get; set; }
    
    [Range(0, 100)]
    public int Percentage { get; set; }

    [Required]
    public bool IsActive { get; set; }
}
