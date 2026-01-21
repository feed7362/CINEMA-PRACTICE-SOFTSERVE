using Backend.Services.DTOs.Hall;
using Backend.Services.Interfaces;
using Backend.API.Extensions;

internal static class HallEndpoints
{
    public static void MapHallEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup("/api/hall")
            .WithTags("Hall");

        group.MapPost("/create", async (
                CreateHallDto dto,
                IHallService hallService) =>
            {
                var result = await hallService.CreateHallAsync(dto);

                return Results.Created(
                    $"/api/hall/{result.Id}",
                    result
                );
            })
            .AddEndpointFilter<ValidationFilter<CreateHallDto>>()
            .RequireAuthorization(p => p.RequireRole("Admin"))
            .WithName("CreateHall")
            .WithSummary("Create a new hall");

        group.MapGet("/{id:int}", async (
                int id,
                IHallService hallService) =>
            {
                var hall = await hallService.GetHallByIdAsync(id);
                return hall is null
                    ? Results.NotFound()
                    : Results.Ok(hall);
            })
            .WithName("GetHallById");

        group.MapGet("/get_all", async (IHallService hallService) =>
            {
                var halls = await hallService.GetAllHallsAsync();
                return Results.Ok(halls);
            })
            .WithName("GetAllHalls");

        group.MapPut("/update", async (
                UpdateHallDto dto,
                IHallService hallService) =>
            {
                var hall = await hallService.UpdateHallAsync(dto);
                return Results.Ok(hall);
            })
            .AddEndpointFilter<ValidationFilter<UpdateHallDto>>()
            .RequireAuthorization(p => p.RequireRole("Admin"))
            .WithName("UpdateHall");

        group.MapDelete("/delete{id:int}", async (
                int id,
                IHallService hallService) =>
            {
                await hallService.DeleteHallAsync(id);
                return Results.NoContent();
            })
            .RequireAuthorization(p => p.RequireRole("Admin"))
            .WithName("DeleteHall");
    }
}
