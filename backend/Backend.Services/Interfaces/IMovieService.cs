using Backend.Services.DTOs;
using Backend.Services.DTOs.Movie;

namespace Backend.Services.Interfaces;

public interface IMovieService
{
    Task<ReadMovieDto> CreateMovieAsync(CreateMovieDto dto);

    Task<ReadMovieDto?> UpdateMovieAsync(UpdateMovieDto dto);

    Task<ReadMovieDto?> GetMovieByIdAsync(int id);

    Task<PagedResponse<ReadMovieDto>> GetAllMoviesAsync(MovieFilterDto filter);

    Task<ReadMovieDto?> DeleteMovieAsync(int id);
}