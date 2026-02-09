using Backend.Services.DTOs.Discount;
using Backend.Services.Interfaces;

namespace Backend.API.Controllers;

internal static class DiscountEndpoints
{
    public static void MapDiscountEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup("/api/discount")
            .WithTags("Discount")
            .RequireAuthorization(p => p.RequireRole("Admin"));

        group.MapGet("/", async (IDiscountService service) =>
            Results.Ok(await service.GetAllDiscountsAsync()));

        group.MapPost("/", async (CreateDiscountDto dto, IDiscountService service) =>
        {
            var result = await service.CreateDiscountAsync(dto);
            return Results.Created($"/api/discount/{result.Id}", result);
        });

        group.MapDelete("/{id:int}", async (int id, IDiscountService service) =>
        {
            await service.DeleteDiscountAsync(id);
            return Results.NoContent();
        });

        group.MapGet("/validate/{code}", async (string code, IDiscountService service) =>
        {
            var result = await service.ValidatePromocodeAsync(code);
            return Results.Ok(result);
        }).RequireAuthorization();

        group.MapGet("/types", async (IDiscountService service) =>
            Results.Ok(await service.GetDiscountTypesAsync()))
        .WithSummary("Отримати всі доступні типи знижок (Percentage, FlatAmount)")
        .Produces<List<DiscountTypeDto>>();
    }
}