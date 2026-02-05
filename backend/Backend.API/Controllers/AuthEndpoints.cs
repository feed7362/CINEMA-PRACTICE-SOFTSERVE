using Backend.API.Extensions;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Auth;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Google.Apis.Auth;
namespace Backend.API.Controllers;

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
                return Results.Json(new { message = "Невірна електронна пошта або пароль" }, statusCode: 401);
            }

            var roles = await userManager.GetRolesAsync(user);
            var token = tokenService.CreateToken(user, roles);

            return Results.Ok(new
            {
                Token = token,
                Email = user.Email,
                Roles = roles
            });
        })
            .WithName("Login");

        group.MapPost("/register", async (
                RegisterDto dto,
                UserManager<ApplicationUser> userManager) =>
        {
            var user = new ApplicationUser { UserName = dto.Email, Email = dto.Email };
            var result = await userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return Results.BadRequest(result.Errors);
            }

            var roleResult = await userManager.AddToRoleAsync(user, "Customer");
            if (!roleResult.Succeeded)
            {
                return Results.Json(new { message = "Не вдалося призначити роль користувачеві" }, statusCode: 500);
            }

            return Results.Created($"/api/auth/user/{user.Id}", new { user.Email });
        })
            .AddEndpointFilter<ValidationFilter<RegisterDto>>()
            .WithName("Register");

        group.MapPost("/external-login", async (
            ExternalLoginDto dto,
            UserManager<ApplicationUser> userManager,
            ITokenService tokenService,
            IConfiguration config) =>
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string> { config["Google:ClientId"]! }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(dto.IdToken, settings);
            if (payload == null) return Results.BadRequest("Invalid Google Token");

            var user = await userManager.FindByEmailAsync(payload.Email);

            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = payload.Email,
                    Email = payload.Email,
                    ProfilePictureUrl = payload.Picture,
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(user);
                await userManager.AddToRoleAsync(user, "Customer");
            }

            var info = new UserLoginInfo("Google", payload.Subject, "Google");
            var existingLogin = await userManager.GetLoginsAsync(user);

            if (existingLogin.All(x => x.ProviderKey != info.ProviderKey))
            {
                await userManager.AddLoginAsync(user, info);
            }

            // standard JWT returned
            var roles = await userManager.GetRolesAsync(user);
            var token = tokenService.CreateToken(user, roles);

            return Results.Ok(new { Token = token, Email = user.Email, Roles = roles });
        });

        group.MapGet("/me", async (
                ClaimsPrincipal claims,
                UserManager<ApplicationUser> userManager) =>
        {
            var email = claims.FindFirstValue(ClaimTypes.Email);
            if (email == null)
                return Results.Json(new { message = "Сесія закінчилася" }, statusCode: 401);

            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                return Results.Json(new { message = "Користувача не знайдено" }, statusCode: 401);

            var roles = await userManager.GetRolesAsync(user);

            return Results.Ok(new
            {
                Email = user.Email,
                Roles = roles
            });
        })
            .RequireAuthorization()
            .WithName("GetCurrentUser");
    }
}