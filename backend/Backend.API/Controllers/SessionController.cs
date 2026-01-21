using Backend.Services.DTOs.Session;
using Backend.Services.Interfaces;

internal static class SessionEndpoints
{
    public static void MapSessionEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup("/api/session")
            .WithTags("Session");

        group.MapPost("/create", async (
                CreateSessionDto dto,
                ISessionService sessionService) =>
            {
                var result = await sessionService.CreateSessionAsync(dto);

                return Results.Created(
                    $"/api/session/{result.Id}",
                    result
                );
            })
            .WithName("CreateSession")
            .WithSummary("Create a new Session");

        group.MapGet("/{id:int}", async (
                int id,
                ISessionService sessionService) =>
            {
                var session = await sessionService.GetSessionByIdAsync(id);
                return session is null
                    ? Results.NotFound()
                    : Results.Ok(session);
            })
            .WithName("GetSessionById");

        group.MapGet("/get_all", async (ISessionService sessionService) =>
            {
                var sessions = await sessionService.GetAllSessionsAsync();
                return Results.Ok(sessions);
            })
            .WithName("GetAllSessions");

        group.MapPut("/update", async (
                UpdateSessionDto dto,
                ISessionService sessionService) =>
            {
                var session = await sessionService.UpdateSessionAsync(dto);
                return Results.Ok(session);
            })
            .WithName("UpdateSession");

        group.MapDelete("/delete{id:int}", async (
                int id,
                ISessionService sessionService) =>
            {
                await sessionService.DeleteSessionAsync(id);
                return Results.NoContent();
            })
            .WithName("DeleteSession");
    }
}