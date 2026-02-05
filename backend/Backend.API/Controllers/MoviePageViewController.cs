using System.Security.Claims;
using Backend.Data;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.API.Controllers;

internal static class MoviePageViewController
{
    public static void MapMoviePageViewEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup("/api/view")
            .WithTags("Movie Page View");

        group.MapPost("/{id:int}", MoviePageViewHandler)
            .RequireAuthorization();
    }

    private static async Task<IResult> MoviePageViewHandler(
    int id,
    ClaimsPrincipal user,
    ApplicationContext context)
    {
        var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var view = await context.MoviePageViews
            .FirstOrDefaultAsync(x => x.UserId == userId && x.MovieId == id);

        if (view == null)
        {
            view = new MoviePageView
            {
                UserId = userId,
                MovieId = id,
                ViewCount = 1,
                LastViewedAt = DateTime.UtcNow
            };
            context.MoviePageViews.Add(view);
        }
        else
        {
            view.ViewCount++;
            view.LastViewedAt = DateTime.UtcNow;
        }

        var userViews = await context.MoviePageViews
            .Where(v => v.UserId == userId)
            .OrderByDescending(v => v.LastViewedAt)
            .ToListAsync();

        if (userViews.Count > 10)
        {
            var toRemove = userViews.Skip(10).ToList();
            context.MoviePageViews.RemoveRange(toRemove);
        }

        await context.SaveChangesAsync();

        return Results.Ok();
    }
}
