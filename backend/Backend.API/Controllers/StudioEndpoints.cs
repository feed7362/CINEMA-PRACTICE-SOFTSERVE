using Backend.Services.DTOs.Studio;
using Backend.Services.Interfaces;

namespace Backend.API.Controllers;

public static class StudioEndpoints
{
    public static void MapStudiosEndpoints(this IEndpointRouteBuilder app)  
    {
        var group = app.MapGroup("/api/studio")
            .WithTags("Studio");

        group.MapGet("/", async (
                [AsParameters] StudioFilterDto filter,
                IStudioService studioService) =>
            {
                var result = await studioService.GetAllStudiosAsync(filter);
                return Results.Ok(result);
            })
            .WithName("GetAllStudios")
            .WithSummary("Get all sessions");
    }
}