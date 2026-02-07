using System.Security.Claims;
using Backend.API.Extensions;
using Backend.Services.DTOs.Movie;
using Backend.Services.Interfaces;

namespace Backend.API.Controllers;

internal static class MovieEndpoints
{
    public static void MapMovieEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup("/api/movie")
            .WithTags("Movie");

        group.MapPost("/", async (
                CreateMovieDto dto,
                IMovieService movieService) =>
            {
                var result = await movieService.CreateMovieAsync(dto);

                return Results.Created(
                    $"/api/movie/{result.Id}",
                    result
                );
            })
            .AddEndpointFilter<ValidationFilter<CreateMovieDto>>()
            .RequireAuthorization(p => p.RequireRole("Admin"))
            .WithName("CreateMovie")
            .WithSummary("Create a new movie");

        group.MapGet("/{id:int}", async (
                int id,
                ClaimsPrincipal user,
                IMovieService movieService,
                IMovieRecommendationService recommendationService,
                bool recordView = false) =>
            {
                var movie = await movieService.GetMovieByIdAsync(id);
                if (movie is null) return Results.NotFound();

                if (recordView)
                {
                    var userIdClaim = user.FindFirstValue(ClaimTypes.NameIdentifier);
                    if (userIdClaim != null)
                    {
                        var userId = int.Parse(userIdClaim);

                        if (!user.IsInRole("Admin"))
                        {
                            await recommendationService.RecordMovieViewAsync(
                                userId, 
                                id
                            );
                        }
                    }
                }

                return Results.Ok(movie);
            })
            .WithName("GetMovieById")
            .WithSummary("Get Movie by Id");


        group.MapGet("/", async (
                IMovieService movieService,
                [AsParameters] MovieFilterDto filter) =>
            {
                var movies = await movieService.GetAllMoviesAsync(filter);
                return Results.Ok(movies);
            })
            .WithName("GetAllMovies")
            .WithSummary("Get all Movies");


        group.MapPut("/", async (
                UpdateMovieDto dto,
                IMovieService movieService) =>
            {
                var movie = await movieService.UpdateMovieAsync(dto);
                return movie is null
                    ? Results.NotFound()
                    : Results.Ok(movie);
            })
            .AddEndpointFilter<ValidationFilter<UpdateMovieDto>>()
            .RequireAuthorization(p => p.RequireRole("Admin"))
            .WithName("UpdateMovie")
            .WithSummary("Update movie by Id");


        group.MapDelete("/{id:int}", async (
                int id,
                IMovieService movieService) =>
            {
                await movieService.DeleteMovieAsync(id);
                return Results.NoContent();
            })
            .RequireAuthorization(p => p.RequireRole("Admin"))
            .WithName("DeleteMovie")
            .WithSummary("Delete movie by Id");

        group.MapGet("/me/recommendations", async (
                ClaimsPrincipal user,
                IMovieRecommendationService recommendationService) =>
        {
            var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var recommendations = await recommendationService
                                            .GetRecommendationsForUserAsync(userId);
            return Results.Ok(recommendations);
        })
            .RequireAuthorization()
            .WithName("GetUserRecommendations")
            .WithSummary("Get personalized movie recommendations for " +
            "the logged-in user");
    }
}