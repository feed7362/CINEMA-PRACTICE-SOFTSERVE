using Backend.API.Extensions;
using Backend.Services.DTOs.Session;
using Backend.Services.Interfaces;

namespace Backend.API.Controllers;

internal static class SessionEndpoints
{
    public static void MapSessionEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup("/api/session")
            .WithTags("Session");

        group.MapGet("/", async (ISessionService sessionService) =>
        {
            var sessions = await sessionService.GetAllSessionsAsync();
            return Results.Ok(sessions);
        })
            .WithName("GetAllSessions")
            .WithSummary("Get all Sessions");

        group.MapGet("/{id:int}", async (
                int id,
                ISessionService sessionService) =>
            {
                var session = await sessionService.GetSessionByIdAsync(id);
                return Results.Ok(session);
            })
            .WithName("GetSessionById")
            .WithSummary("Get Session by Id");

        group.MapGet("/{id:int}/seats", async (
            int id,
            ISessionService sessionService
        ) =>
        {
            var seats = await sessionService.GetSeatsBySessionAsync(id);
            return Results.Ok(seats);
        })
            .WithName("GetSeatsBySession")
            .WithSummary("Get all seats for a session with reservation status");

        group.MapPost("/", async (
                CreateSessionDto dto,
                ISessionService sessionService) =>
        {
            var result = await sessionService.CreateSessionAsync(dto);

            return Results.Created(
                $"/api/session/{result.Id}",
                result
            );
        })
            .AddEndpointFilter<ValidationFilter<CreateSessionDto>>()
            .RequireAuthorization(p => p.RequireRole("Admin"))
            .WithName("CreateSession")
            .WithSummary("Create a new Session");

        group.MapPut("/", async (
                UpdateSessionDto dto,
                ISessionService sessionService) =>
            {
                var session = await sessionService.UpdateSessionAsync(dto);
                return Results.Ok(session);
            })
            .AddEndpointFilter<ValidationFilter<UpdateSessionDto>>()
            .RequireAuthorization(p => p.RequireRole("Admin"))
            .WithName("UpdateSession")
            .WithSummary("Update session by Id");

        group.MapDelete("/{id:int}", async (
                int id,
                ISessionService sessionService) =>
            {
                var session = await sessionService.DeleteSessionAsync(id);
                return Results.Ok(session);
            })
            .RequireAuthorization(p => p.RequireRole("Admin"))
            .WithName("DeleteSession")
            .WithSummary("Delete session by Id");
    }
}