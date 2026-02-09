using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs;
using Backend.Services.DTOs.Movie;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;

namespace Backend.Services.Services
{
    public class MovieService(
        IRepository<Movie> movieRepository,
        IMapper mapper
    ) : IMovieService
    {
        public async Task<ReadMovieDto> CreateMovieAsync(CreateMovieDto dto)
        {
            var movie = mapper.Map<Movie>(dto);

            movie.MovieGenres = dto.GenreIds.Select(gId => new MovieGenre { GenreId = gId }).ToList();
            movie.MovieActors = dto.ActorIds.Select(aId => new MovieActor { ActorId = aId }).ToList();

            await movieRepository.AddAsync(movie);

            var fullMovieDto = await GetMovieByIdAsync(movie.Id);
            return fullMovieDto
                    ?? throw new InternalServerException("Помилка при отриманні" +
                    " щойно створеного фільму.");
        }

        public async Task<ReadMovieDto?> UpdateMovieAsync(UpdateMovieDto dto)
        {
            var spec = new MovieById(dto.Id);
            var movie = await movieRepository.GetFirstBySpecAsync(spec);
            if (movie == null)
                throw new EntityNotFoundException("Фільм", dto.Id);

            mapper.Map(dto, movie);

            movie.MovieGenres.Clear();
            foreach (var gId in dto.GenreIds)
            {
                movie.MovieGenres.Add(new MovieGenre { 
                    GenreId = gId, 
                    MovieId = movie.Id 
                });
            }

            movie.MovieActors.Clear();
            foreach (var aId in dto.ActorIds)
            {
                movie.MovieActors.Add(new MovieActor { 
                    ActorId = aId, 
                    MovieId = movie.Id 
                });
            }

            await movieRepository.UpdateAsync(movie);

            return mapper.Map<ReadMovieDto>(movie);
        }

        public async Task<ReadMovieDto?> GetMovieByIdAsync(int id)
        {
            var spec = new MovieById(id);
            var movie = await movieRepository.GetFirstBySpecAsync(spec);

            if (movie == null)
                throw new EntityNotFoundException($"Фільм", id);

            return mapper.Map<ReadMovieDto>(movie);
        }


        public async Task<PagedResponse<ReadMovieDto>> GetAllMoviesAsync(
                MovieFilterDto filter
            )
        {
            var filterSpec = new MoviesByFilterSpec(filter);
            var totalCount = await movieRepository.CountAsync(filterSpec);

            var pagedSpec = new MoviesByFilterPagedSpec(filter);
            var movies = await movieRepository.GetListBySpecAsync(pagedSpec);

            var items = mapper.Map<List<ReadMovieDto>>(movies);

            return new PagedResponse<ReadMovieDto>(
                items,
                totalCount,
                filter.PageNumber ?? 1,
                filter.PageSize ?? 10
            );
        }


        public async Task<ReadMovieDto?> DeleteMovieAsync(int id)
        {
            var movie = await movieRepository.GetByIdAsync(id);
            if (movie == null)
                throw new EntityNotFoundException($"Фільм", id);

            await movieRepository.DeleteAsync(movie);
            return mapper.Map<ReadMovieDto>(movie);
        }
        
        public async Task<List<string>> GetDirectorsAsync()
        {
            var movies = await movieRepository.GetAllAsync();
            
            return movies
                .Select(m => m.Director)
                .Where(d => !string.IsNullOrWhiteSpace(d))
                .Distinct()
                .OrderBy(d => d)
                .ToList();
        }

        public async Task<List<string>> GetCountriesAsync()
        {
            var movies = await movieRepository.GetAllAsync();
            
            return movies
                .Select(m => m.Country)
                .Where(c => !string.IsNullOrWhiteSpace(c))
                .Distinct()
                .OrderBy(c => c)
                .ToList();
        }
    }
}