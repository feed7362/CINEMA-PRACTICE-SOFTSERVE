using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum AgeRating : short
{
    _0Plus = 0,
    _12Plus = 12,
    _16Plus = 16,
    _18Plus = 18,
}

public class Movie : IEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int StudioId { get; set; }

    [Required]
    [MaxLength(150)]
    [Column(TypeName = "varchar(150)")]
    public string MovieTitleORG { get; set; } = null!;
    
    [Required]
    [MaxLength(150)]
    [Column(TypeName = "varchar(150)")]
    public string MovieTitleUKR { get; set; } = null!;
    
    [Column(TypeName = "text")]
    public string? Description { get; set; }

    [Required]
    [Range(1, 600)]
    public int Duration { get; set; }

    [Required]
    public DateTime ReleaseDate { get; set; }
    
    [Required]
    public DateTime FinishDate { get; set; }

    [Required]
    [Column(TypeName = "smallint")]
    public AgeRating AgeRating { get; set; } = AgeRating._0Plus;
    
    [Column(TypeName = "decimal(3,1)")]
    [Range(0.0, 10.0, ErrorMessage = "Rating must be between 0.0 and 10.0")]
    public decimal? IMDBRating { get; set; }

    [MaxLength(100)]
    [Column(TypeName = "varchar(100)")]
    public string? Director { get; set; }
    
    [MaxLength(100)]
    [Column(TypeName = "varchar(100)")]
    public string? Country { get; set; }
    
    public bool Subtitles { get; set; }

    [MaxLength(200)]
    [Column(TypeName = "varchar(200)")]
    public string? ImageURL { get; set; }
    
    [MaxLength(200)]
    [Column(TypeName = "varchar(200)")]
    public string? TrailerURL { get; set; }
    
    [MaxLength(200)]
    [Column(TypeName = "varchar(200)")]
    public Studio Studio { get; set; } = null!;
    
    public ICollection<Session> Sessions { get; set; } = new List<Session>();
    public ICollection<MovieActor> MovieActors { get; set; } = new List<MovieActor>();
    public ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();

}
