using Ardalis.Specification;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Movie;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;

namespace Backend.Services.Services;

public class MovieRecommendationService : IMovieRecommendationService
{
    private readonly IRepository<MoviePageView> _viewRepository;
    private readonly IRepository<Movie> _movieRepository;

    public MovieRecommendationService(
        IRepository<MoviePageView> viewRepository,
        IRepository<Movie> movieRepository)
    {
        _viewRepository = viewRepository;
        _movieRepository = movieRepository;
    }

    public async Task<List<MovieRecommendationDto>> GetRecommendationsForUserAsync(int userId, int top = 10)
    {
        var views = await _viewRepository.GetListBySpecAsync(new UserMoviePageViewsSpec(userId));

        if (views == null || !views.Any())
            return new List<MovieRecommendationDto>();

        var viewCounts = views.ToDictionary(v => v.MovieId, v => v.ViewCount);

        var genreWeights = views
            .Where(v => v.Movie?.MovieGenres != null)
            .SelectMany(v => v.Movie.MovieGenres!)
            .GroupBy(g => g.GenreId)
            .ToDictionary(
                g => g.Key,
                g => g.Sum(v => viewCounts[v.MovieId])
            );

        var actorWeights = views
            .Where(v => v.Movie?.MovieActors != null)
            .SelectMany(v => v.Movie.MovieActors!)
            .GroupBy(a => a.ActorId)
            .ToDictionary(
                g => g.Key,
                g => g.Sum(v => viewCounts[v.MovieId])
            );

        var allMovies = await _movieRepository.GetListBySpecAsync(
            new MovieWithActorsAndGenresSpec()
        );

        var ranked = allMovies
            .Select(m => new
            {
                Movie = m,
                Score =
                    (m.MovieGenres?.Sum(g => genreWeights.GetValueOrDefault(g.GenreId, 0)) ?? 0) * 2.0 +
                    (m.MovieActors?.Sum(a => actorWeights.GetValueOrDefault(a.ActorId, 0)) ?? 0) * 0.5 -
                    (views.Any(v => v.MovieId == m.Id) ? 10 : 0)
            })
            .OrderByDescending(x => x.Score)
            .Take(top)
            .Select(x => new MovieRecommendationDto
            {
                Id = x.Movie.Id,
                TitleOrg = x.Movie.TitleOrg,
                TitleUkr = x.Movie.TitleUkr,
                Director = x.Movie.Director,
                ImdbRating = x.Movie.ImdbRating,
                Actors = x.Movie.MovieActors?
            .Where(ma => ma.Actor != null)
            .Select(ma => ma.Actor!.Name)
            .ToList() ?? new List<string>(),

                Genres = x.Movie.MovieGenres?
            .Where(mg => mg.Genre != null)
            .Select(mg => mg.Genre!.Name)
            .ToList() ?? new List<string>()

            })
            .ToList();

        return ranked;
    }
}
