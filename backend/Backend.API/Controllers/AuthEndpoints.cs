using Backend.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Backend.Services.DTOs.Auth;
using Backend.Services.Interfaces;
using Backend.API.Extensions;

internal static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/auth").WithTags("Auth");

        group.MapPost("/login", async (
            LoginDto dto,
            UserManager<ApplicationUser> userManager,
            ITokenService tokenService) =>
        {
            var user = await userManager.FindByEmailAsync(dto.Email);

            if (user == null || !await userManager.CheckPasswordAsync(user, dto.Password))
            {
                return Results.Unauthorized();
            }

            var roles = await userManager.GetRolesAsync(user);
            var token = tokenService.CreateToken(user, roles);

            return Results.Ok(new { Token = token, Email = user.Email });
        })
        .WithName("Login");

        group.MapPost("/register", async (
            RegisterDto dto,
            UserManager<ApplicationUser> userManager) =>
        {
            var user = new ApplicationUser { UserName = dto.Email, Email = dto.Email };
            var result = await userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded) return Results.BadRequest(result.Errors);

            // За замовчуванням додаємо роль "Customer"
            await userManager.AddToRoleAsync(user, "Customer");

            return Results.Created($"/api/auth/user/{user.Id}", new { user.Email });
        })
        .AddEndpointFilter<ValidationFilter<RegisterDto>>()
        .WithName("Register");
    }
}