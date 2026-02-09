using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs;
using Backend.Services.DTOs.Movie;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Services
{
    public class MovieService(IRepository<Movie> movieRepository) : IMovieService
    {
        public async Task<ReadMovieDto> CreateMovieAsync(CreateMovieDto dto)
        {
            var movie = new Movie
            {
                StudioId = dto.StudioId,
                TitleOrg = dto.TitleOrg,
                TitleUkr = dto.TitleUkr,
                Description = dto.Description,
                Duration = dto.Duration,
                ReleaseDate = dto.ReleaseDate,
                FinishDate = dto.FinishDate,
                AgeRating = dto.AgeRating,
                ImdbRating = dto.ImdbRating,
                Director = dto.Director,
                Country = dto.Country,
                Subtitles = dto.Subtitles,
                ImageUrl = dto.ImageUrl,
                TrailerUrl = dto.TrailerUrl,

                MovieGenres = dto.GenreIds.Select(gId => new MovieGenre
                {
                    GenreId = gId
                }).ToList(),

                MovieActors = dto.ActorIds.Select(aId => new MovieActor
                {
                    ActorId = aId
                }).ToList()
            };

            await movieRepository.AddAsync(movie);

            var fullMovieDto = await GetMovieByIdAsync(movie.Id);
            return fullMovieDto ?? throw new Exception("Error retrieving created movie.");
        }

        public async Task<ReadMovieDto?> UpdateMovieAsync(UpdateMovieDto dto)
        {
            var spec = new ById(dto.Id);
            var movie = await movieRepository.GetFirstBySpecAsync(spec);
            if (movie == null) return null;

            movie.StudioId = dto.StudioId;
            movie.TitleOrg = dto.TitleOrg;
            movie.TitleUkr = dto.TitleUkr;
            movie.Description = dto.Description;
            movie.Duration = dto.Duration;
            movie.ReleaseDate = dto.ReleaseDate;
            movie.FinishDate = dto.FinishDate;
            movie.AgeRating = dto.AgeRating;
            movie.ImdbRating = dto.ImdbRating;
            movie.Director = dto.Director;
            movie.Country = dto.Country;
            movie.Subtitles = dto.Subtitles;
            movie.ImageUrl = dto.ImageUrl;
            movie.TrailerUrl = dto.TrailerUrl;

            movie.MovieGenres.Clear();
            foreach (var gId in dto.GenreIds)
            {
                movie.MovieGenres.Add(new MovieGenre { GenreId = gId, MovieId = movie.Id });
            }

            movie.MovieActors.Clear();
            foreach (var aId in dto.ActorIds)
            {
                movie.MovieActors.Add(new MovieActor { ActorId = aId, MovieId = movie.Id });
            }

            await movieRepository.UpdateAsync(movie);

            return MapToDto(movie);
        }

        public async Task<ReadMovieDto?> GetMovieByIdAsync(int id)
        {
            var spec = new ById(id);
            var movie = await movieRepository.GetFirstBySpecAsync(spec);

            return movie == null ? null : MapToDto(movie);
        }


        public async Task<PagedResponse<ReadMovieDto>> GetAllMoviesAsync(MovieFilterDto filter)
        {
            var filterSpec = new MovieSearchFilterSpec(filter);
            var totalCount = await movieRepository.CountAsync(filterSpec);

            var pagedSpec = new MovieSearchPagedSpec(filter);
            var movies = await movieRepository.GetListBySpecAsync(pagedSpec);

            var items = movies.Select(MapToDto).ToList();

            return new PagedResponse<ReadMovieDto>(
                items,
                totalCount,
                filter.PageNumber ?? 1,
                filter.PageSize ?? 10
            );
        }

        public async Task DeleteMovieAsync(int id)
        {
            await movieRepository.DeleteAsync(id);
        }

        // --- НОВІ МЕТОДИ ---

        public async Task<List<string>> GetDirectorsAsync()
        {
            // Отримуємо всі фільми (або використовуємо легку специфікацію без Include)
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

        // -------------------

        private static ReadMovieDto MapToDto(Movie m)
        {
            return new ReadMovieDto
            {
                Id = m.Id,
                StudioName = m.Studio?.Name ?? "Unknown", // Додано null-check

                TitleOrg = m.TitleOrg,
                TitleUkr = m.TitleUkr,
                Description = m.Description,
                Duration = m.Duration,
                ReleaseDate = m.ReleaseDate,
                FinishDate = m.FinishDate,
                AgeRating = m.AgeRating,
                ImdbRating = m.ImdbRating,
                Director = m.Director,
                Country = m.Country,
                Subtitles = m.Subtitles,
                ImageUrl = m.ImageUrl,
                TrailerUrl = m.TrailerUrl,

                GenreNames = m.MovieGenres.Select(mg => mg.Genre.Name).ToList(),
                ActorNames = m.MovieActors.Select(ma => ma.Actor.Name).ToList()
            };
        }
    }
}