using Backend.Services.DTOs.Genre;
using Backend.Services.Interfaces;
using Backend.Domain.Interfaces;
using Backend.Domain.Entities;

namespace Backend.Services.Services;

public class GenreService : IGenreService
{
    private readonly IRepository<Genre> _repository; 

    public GenreService(IRepository<Genre> repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ReadGenreDto>> GetAllGenresAsync()
    {
        var genres = await _repository.GetAllAsync();
        
        return genres.Select(g => new ReadGenreDto
        {
            Id = g.Id,
            Name = g.Name
        });
    }
}