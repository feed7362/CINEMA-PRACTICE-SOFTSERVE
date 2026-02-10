using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Genre;
using Backend.Services.Interfaces;

namespace Backend.Services.Services;

public class GenreService(
    IRepository<Genre> repository,
    IMapper mapper
) : IGenreService
{
    public async Task<IEnumerable<ReadGenreDto>> GetAllGenresAsync()
    {
        var genres = await repository.GetAllAsync();
        return mapper.Map<IEnumerable<ReadGenreDto>>(genres);
    }
}