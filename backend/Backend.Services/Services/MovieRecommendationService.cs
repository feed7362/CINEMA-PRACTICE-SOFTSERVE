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
            IRepository<Movie> movieRepository
        )
    {
        _viewRepository = viewRepository;
        _movieRepository = movieRepository;
    }

    public async Task RecordMovieViewAsync(int userId, int movieId)
    {
        var views = await _viewRepository.GetListBySpecAsync(
                new RecentMovieViewsByUserIdSpec(userId)
            );
        var existingView = views.FirstOrDefault(v => v.MovieId == movieId);

        if (existingView == null)
        {
            if (views.Count >= 10)
            {
                var oldest = views.Last();
                await _viewRepository.DeleteAsync(oldest);
            }

            await _viewRepository.AddAsync(new MoviePageView
            {
                UserId = userId,
                MovieId = movieId,
                ViewCount = 1,
                LastViewedAt = DateTime.UtcNow
            });
        }
        else
        {
            existingView.ViewCount++;
            existingView.LastViewedAt = DateTime.UtcNow;
            await _viewRepository.UpdateAsync(existingView);
        }

        await _viewRepository.SaveChangesAsync();
    }

    public async Task<List<MovieRecommendationDto>> GetRecommendationsForUserAsync(
            int userId, 
            int top = 10
        )
    {
        var views = await _viewRepository.GetListBySpecAsync(
                new RecentMovieViewsByUserIdSpec(userId)
            );
        if (!views.Any()) return new List<MovieRecommendationDto>();

        var genreWeights = views.SelectMany(v => v.Movie.MovieGenres)
            .GroupBy(g => g.GenreId)
            .ToDictionary(g => g.Key, g => g.Count() * 2.0);

        var actorWeights = views.SelectMany(v => v.Movie.MovieActors)
            .GroupBy(a => a.ActorId)
            .ToDictionary(g => g.Key, g => g.Count() * 0.5);

        var viewedMovieIds = views.Select(v => v.MovieId).ToList();

        var candidates = await _movieRepository.GetListBySpecAsync(
            new RecommendedMoviesCandidateSpec(
                    genreWeights.Keys, 
                    actorWeights.Keys, 
                    viewedMovieIds
                )

        );

        return candidates
            .Select(m => new {
                Movie = m,
                Score = m.MovieGenres
                        .Sum(g => genreWeights.GetValueOrDefault(g.GenreId, 0)) +
                        m.MovieActors
                        .Sum(a => actorWeights.GetValueOrDefault(a.ActorId, 0)) +
                        (double)(m.ImdbRating ?? 0m) * 0.5
            })
            .OrderByDescending(x => x.Score)
            .Take(top)
            .Select(x => MapToDto(x.Movie))
            .ToList();
    }

    private MovieRecommendationDto MapToDto(Movie m) => new()
    {
        Id = m.Id,
        TitleOrg = m.TitleOrg,
        TitleUkr = m.TitleUkr,
        Director = m.Director,
        ImdbRating = m.ImdbRating,
        Genres = m.MovieGenres.Select(g => g.Genre.Name).ToList(),
        Actors = m.MovieActors.Select(a => a.Actor.Name).ToList()
    };
}