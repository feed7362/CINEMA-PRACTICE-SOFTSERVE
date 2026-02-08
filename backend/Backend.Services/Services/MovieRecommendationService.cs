using Ardalis.Specification;
using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Movie;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;

namespace Backend.Services.Services;

public class MovieRecommendationService(
        IRepository<MoviePageView> viewRepository,
        IRepository<Movie> movieRepository,
        IMapper mapper
    ) : IMovieRecommendationService
{

    public async Task RecordMovieViewAsync(int userId, int movieId)
    {
        var movieExists = await movieRepository.AnyAsync(m => m.Id == movieId);
        if (!movieExists) throw new EntityNotFoundException("Фільм", movieId);

        var views = await viewRepository.GetListBySpecAsync(
                new RecentMovieViewsByUserIdSpec(userId)
            );
        var existingView = views.FirstOrDefault(v => v.MovieId == movieId);

        if (existingView == null)
        {
            if (views.Count >= 10)
            {
                var oldest = views.Last();
                await viewRepository.DeleteAsync(oldest);
            }

            await viewRepository.AddAsync(new MoviePageView
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
            await viewRepository.UpdateAsync(existingView);
        }
    }

    public async Task<List<MovieRecommendationDto>> GetRecommendationsForUserAsync(
            int userId, 
            int top = 10
        )
    {
        var views = await viewRepository.GetListBySpecAsync(
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

        var candidates = await movieRepository.GetListBySpecAsync(
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
            .Select(x => mapper.Map<MovieRecommendationDto>(x.Movie))
            .ToList();
    }
}