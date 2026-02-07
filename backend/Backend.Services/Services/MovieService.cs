using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs;
using Backend.Services.DTOs.Movie;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;

namespace Backend.Services.Services
{
    public class MovieService(
            IRepository<Movie> movieRepository
        ) : IMovieService
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

                // Convert List<int> -> List<MovieGenre>
                MovieGenres = dto.GenreIds.Select(gId => new MovieGenre
                {
                    GenreId = gId
                }).ToList(),

                // Convert List<int> -> List<MovieActor>
                MovieActors = dto.ActorIds.Select(aId => new MovieActor
                {
                    ActorId = aId
                }).ToList()
            };

            await movieRepository.AddAsync(movie);

            var fullMovieDto = await GetMovieByIdAsync(movie.Id);
            return fullMovieDto 
                    ?? throw new Exception("Error retrieving created movie.");
        }

        public async Task<ReadMovieDto?> UpdateMovieAsync(UpdateMovieDto dto)
        {
            var spec = new MovieById(dto.Id);
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

            return MapToDto(movie);
        }

        public async Task<ReadMovieDto?> GetMovieByIdAsync(int id)
        {
            var spec = new MovieById(id);
            var movie = await movieRepository.GetFirstBySpecAsync(spec);

            return movie == null ? null : MapToDto(movie);
        }


        public async Task<PagedResponse<ReadMovieDto>> GetAllMoviesAsync(
                MovieFilterDto filter
            )
        {
            var filterSpec = new MoviesByFilterSpec(filter);
            var totalCount = await movieRepository.CountAsync(filterSpec);

            var pagedSpec = new MoviesByFilterPagedSpec(filter);
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

        private static ReadMovieDto MapToDto(Movie m)
        {
            return new ReadMovieDto
            {
                Id = m.Id,
                StudioName = m.Studio.Name,

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

                GenreNames = m.MovieGenres
                                .Select(mg => mg.Genre.Name).ToList(),
                ActorNames = m.MovieActors
                                .Select(ma => ma.Actor.Name).ToList()
            };
        }
    }
}