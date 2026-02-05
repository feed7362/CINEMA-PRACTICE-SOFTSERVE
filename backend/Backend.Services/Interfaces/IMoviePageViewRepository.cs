using Backend.Domain.Entities;
using Backend.Services.DTOs.Movie;

namespace Backend.Services.Interfaces;

public interface IMovieRecommendationService
{
    Task<List<MovieRecommendationDto>> GetRecommendationsForUserAsync(int userId, int top = 10);
}