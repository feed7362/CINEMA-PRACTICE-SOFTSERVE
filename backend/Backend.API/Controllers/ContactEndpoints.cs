using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs.Contact;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers;

public static class ContactEndpoints
{
    public static void MapContactEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/contact");

        group.MapPost("/", async (
            [FromBody] CreateContactDto dto, 
            IRepository<ContactMessage> repository) =>
        {
            var message = new ContactMessage
            {
                Name = dto.Name,
                Email = dto.Email,
                Message = dto.Message,
                CreatedAt = DateTime.UtcNow
            };

            await repository.AddAsync(message);

            return Results.Ok(new { 
                message = "Повідомлення успішно відправлено" 
            });
        });
    }
}