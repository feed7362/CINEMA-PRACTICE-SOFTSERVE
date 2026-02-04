using Backend.Services.DTOs.Genre;

namespace Backend.Services.Interfaces;

public interface IGenreService
{
    Task<IEnumerable<ReadGenreDto>> GetAllGenresAsync();
}