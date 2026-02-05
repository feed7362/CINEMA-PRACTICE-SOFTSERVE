using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers;

public static class StudioEndpoints
{
    public static void MapStudiosEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/studio");

        group.MapGet("/", async (IRepository<Studio> studioRepository) =>
        {
            var spec = new AllStudiosSpec();
            var studios = await studioRepository.GetListBySpecAsync(spec);

            var studioDtos = studios.Select(s => new 
            {
                Id = s.Id,
                Name = s.Name
            }).ToList();

            return Results.Ok(studioDtos);
        });
    }
}