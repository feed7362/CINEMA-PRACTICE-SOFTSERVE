using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Studio : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    [Column(TypeName = "varchar(200)")]
    public string StudioName { get; set; } = null!;

    public ICollection<Movie> Movies { get; set; } = new List<Movie>();
}
