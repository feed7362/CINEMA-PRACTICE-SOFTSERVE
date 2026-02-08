using System.Security.Claims;
using Backend.Services.Interfaces;

namespace Backend.API.Controllers;

internal static class TicketEndpoints
{
    public static void MapTicketEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup("/api/ticket")
            .WithTags("Ticket");

        group.MapGet("/", async (
            ITicketService service,
            ClaimsPrincipal user,
            int page = 1,
            int pageSize = 10) =>
        {
            var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);
            return Results.Ok(
                await service.GetUserTicketsAsync(userId, page, pageSize)
            );
        })
            .RequireAuthorization(p => p.RequireRole("Admin"));

        group.MapGet("/{id:int}", async (
            int id,
            ITicketService service,
            ClaimsPrincipal user) =>
        {
            var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var ticket = await service.GetTicketByIdAsync(id, userId);

            return Results.Ok(ticket);
        });

    }
}