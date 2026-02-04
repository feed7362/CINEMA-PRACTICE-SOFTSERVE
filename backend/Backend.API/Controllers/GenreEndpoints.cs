using Backend.Services.Interfaces;
using Backend.Services.DTOs.Genre;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Backend.API.Controllers;

internal static class GenreEndpoints
{
    public static void MapGenreEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup("/api/genre")
            .WithTags("Genre");

        group.MapGet("/", async (IGenreService genreService) =>
        {
            var genres = await genreService.GetAllGenresAsync();
            return Results.Ok(genres);
        })
        .WithName("GetAllGenres")
        .WithSummary("Get all Genres");
    }
}