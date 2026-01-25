using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Domain.Shared;
using Backend.Services.DTOs.Movie;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;

namespace Backend.Services.Services
{
    public class MovieService(IRepository<Movie> movieRepository) : IMovieService
    {
        public async Task<ReadMovieDto> CreateMovieAsync(CreateMovieDto dto)
        {
            var movie = new Movie
            {
                StudioId = dto.StudioId,
                TitleORG = dto.TitleORG,
                TitleUKR = dto.TitleUKR,
                Description = dto.Description,
                Duration = dto.Duration,
                ReleaseDate = dto.ReleaseDate,
                FinishDate = dto.FinishDate,
                AgeRating = dto.AgeRating,
                IMDBRating = dto.IMDBRating,
                Director = dto.Director,
                Country = dto.Country,
                Subtitles = dto.Subtitles,
                ImageURL = dto.ImageURL,
                TrailerURL = dto.TrailerURL,

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
            return fullMovieDto ?? throw new Exception("Error retrieving created movie.");
        }

        public async Task<ReadMovieDto?> UpdateMovieAsync(UpdateMovieDto dto)
        {
            var spec = new ById(dto.Id);
            var movie = await movieRepository.GetFirstBySpecAsync(spec);
            if (movie == null) return null;

            movie.StudioId = dto.StudioId;
            movie.TitleORG = dto.TitleORG;
            movie.TitleUKR = dto.TitleUKR;
            movie.Description = dto.Description;
            movie.Duration = dto.Duration;
            movie.ReleaseDate = dto.ReleaseDate;
            movie.FinishDate = dto.FinishDate;
            movie.AgeRating = dto.AgeRating;
            movie.IMDBRating = dto.IMDBRating;
            movie.Director = dto.Director;
            movie.Country = dto.Country;
            movie.Subtitles = dto.Subtitles;
            movie.ImageURL = dto.ImageURL;
            movie.TrailerURL = dto.TrailerURL;

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

        public async Task<PagedResult<ReadMovieDto>> GetAllMoviesAsync(MovieFilterDto filter)
        {
            var spec = new Search(filter);

            var pagedData = await movieRepository.ListPagedAsync(
                spec,
                filter.PageNumber ?? 1,
                filter.PageSize ?? 10
            );

            var dtos = pagedData.Items.Select(MapToDto).ToList();

            return new PagedResult<ReadMovieDto>(
                dtos,
                pagedData.TotalItems,
                pagedData.PageNumber,
                pagedData.PageSize
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

                TitleORG = m.TitleORG,
                TitleUKR = m.TitleUKR,
                Description = m.Description,
                Duration = m.Duration,
                ReleaseDate = m.ReleaseDate,
                FinishDate = m.FinishDate,
                AgeRating = m.AgeRating,
                IMDBRating = m.IMDBRating,
                Director = m.Director,
                Country = m.Country,
                Subtitles = m.Subtitles,
                ImageURL = m.ImageURL,
                TrailerURL = m.TrailerURL,

                GenreNames = m.MovieGenres.Select(mg => mg.Genre.Name).ToList(),
                ActorNames = m.MovieActors.Select(ma => ma.Actor.Name).ToList()
            };
        }
    }
}