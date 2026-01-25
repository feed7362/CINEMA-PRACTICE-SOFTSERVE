using Backend.Domain.Shared;
using Backend.Services.DTOs.Movie;

namespace Backend.Services.Interfaces;

public interface IMovieService
{
    Task<ReadMovieDto> CreateMovieAsync(CreateMovieDto dto);

    Task<ReadMovieDto?> UpdateMovieAsync(UpdateMovieDto dto);

    Task<ReadMovieDto?> GetMovieByIdAsync(int id);

    Task<PagedResult<ReadMovieDto>> GetAllMoviesAsync(MovieFilterDto filter);

    Task DeleteMovieAsync(int id);
}