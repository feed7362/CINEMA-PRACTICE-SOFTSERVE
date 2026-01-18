using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class MovieGenre : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Required]
    public int MovieId { get; set; }
    
    [Required]
    public int GenreId { get; set; }

    public Movie Movie { get; set; } = null!;
    public Genre Genre { get; set; } = null!;
}