using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Genre : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    [Column(TypeName = "varchar(50)")]
    public string GenreName { get; set; } = null!;

    public ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();
}