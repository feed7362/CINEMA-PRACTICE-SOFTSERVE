using Backend.Services.DTOs.Admin;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers;

public static class AdminEndpoints
{
    public static void MapAdminEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/admin/stats")
            .WithTags("Admin Analytics")
            .RequireAuthorization(p => p.RequireRole("Admin"));


        group.MapGet("/revenue", async (
                [FromQuery] DateTime from,
                [FromQuery] DateTime to,
                IAdminStatsService service) =>
            {
                var result = await service.GetTotalRevenueAsync(from, to);
                return Results.Ok(new { TotalRevenue = result });
            })
            .WithSummary("Total Revenue")
            .WithDescription(
                "Calculates total revenue for a specific period. If 'to' is not specified, " +
                "it calculates revenue for the single day specified in 'from'.")
            .Produces(200);

        group.MapGet("/occupancy/{sessionId:int}", async (
                int sessionId,
                IAdminStatsService service) =>
            {
                var result = await service.GetSessionOccupancyAsync(sessionId);
                return Results.Ok(new { OccupancyPercentage = Math.Round(result, 2) });
            })
            .WithSummary("Session Occupancy (%)")
            .WithDescription(
                "Returns the percentage of sold seats relative to the total hall capacity for a specific session.")
            .Produces(200);

        group.MapGet("/top-movies", async (
                IAdminStatsService service) =>
            {
                var result = await service.GetTopMoviesAsync();
                return Results.Ok(result);
            })
            .WithSummary("Top 3 Movies")
            .WithDescription(
                "Returns a list of the top 3 movies that generated the highest revenue/ticket sales of all time.")
            .Produces<List<TopMovieDto>>();

        group.MapGet("/special-tickets", async (
                [FromQuery] int movieId,
                [FromQuery] DateTime? from,
                [FromQuery] DateTime? to,
                IAdminStatsService service) =>
            {
                var result = await service.GetSpecialTicketsCountAsync(movieId, from, to);
                return Results.Ok(new { SpecialTicketsCount = result });
            })
            .WithSummary("Discounted Tickets Count")
            .WithDescription("Counts tickets sold with a discount (>0%). " +
                             "Can be filtered by movie ID or date range.")
            .Produces(200);

        group.MapGet("/genre/popular/{genreId:int}", async (
                int genreId,
                IAdminStatsService service) =>
            {
                var result = await service.GetMostPopularMovieByGenreAsync(genreId);
                return result != null ? Results.Ok(result) : Results.NotFound("No sales for this genre");
            })
            .WithSummary("Most Popular Movie by Genre")
            .WithDescription("Finds the movie within a specific genre " +
                             "that has the highest number of ticket sales.")
            .Produces<TopMovieDto>()
            .Produces(404);

        group.MapGet("/heatmap/{hallId:int}", async (
                int hallId,
                IAdminStatsService service) =>
            {
                var result = await service.GetHallHeatmapAsync(hallId);
                return Results.Ok(result);
            })
            .WithSummary("Hall Heatmap")
            .WithDescription(
                "Returns seat coordinates, purchase frequency, " +
                "and a category color ('Red' for popular, 'Blue' for less popular).") // Оновили опис
            .Produces<List<SeatHeatmapDto>>();
    }
}