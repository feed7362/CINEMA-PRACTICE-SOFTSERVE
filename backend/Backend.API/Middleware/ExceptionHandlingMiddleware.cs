using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Net;
using System.Security.Claims;
using System.Text.Json;

namespace Backend.API.Middleware;

public class ExceptionHandlingMiddleware(
    RequestDelegate next,
    ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(
            HttpContext context, 
            IRepository<ErrorLog> errorRepo
        )
    {
        try
        {
            await next(context);

            if (context.Response.StatusCode == StatusCodes.Status404NotFound)
            {
                await HandleNotFoundNoise(context, errorRepo);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(
                ex, 
                "Виявлено необроблену помилку: {Message}", 
                ex.Message
            );

            await LogErrorToDb(context, errorRepo, ex);
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleNotFoundNoise(
        HttpContext context,
        IRepository<ErrorLog> errorRepo
    )
    {
        var path = context.Request.Path.Value?.ToLower();
        var noiseItems = new[] { "favicon", ".php", ".env", "wp-admin", ".git" };

        if (path != null && !noiseItems.Any(path.Contains))
        {
            await LogErrorToDb(
                context, 
                errorRepo, 
                new Exception($"Сторінку не знайдено (404): {path}")
            );
        }
    }

    private static async Task HandleExceptionAsync(
        HttpContext context, 
        Exception exception
    )
    {
        context.Response.ContentType = "application/json";

        var (statusCode, title) = exception switch
        {
            EntityNotFoundException or NotFoundException
                => (HttpStatusCode.NotFound, "Ресурс не знайдено"),

            BadRequestException
                => (HttpStatusCode.BadRequest, "Невірний запит"),

            ConflictException or BookingConflictException
                => (HttpStatusCode.Conflict, "Конфлікт бізнес-логіки"),

            PaymentRequiredException
                => (HttpStatusCode.PaymentRequired, "Помилка оплати"),

            InternalServerException
                => (HttpStatusCode.InternalServerError, "Внутрішня помилка сервера"),

            UnauthorizedAccessException
                => (HttpStatusCode.Unauthorized, "Доступ заборонено"),

            DbUpdateException { InnerException: PostgresException { SqlState: "40001" } }
                => (HttpStatusCode.ServiceUnavailable, "Помилка паралельного " +
                "доступу (Concurrency)"),

            _ => (HttpStatusCode.InternalServerError, "Непередбачена помилка")
        };

        context.Response.StatusCode = (int)statusCode;

        var problem = new ProblemDetails
        {
            Title = title,
            Status = (int)statusCode,
            Detail = exception.Message,
            Instance = context.Request.Path
        };

        var traceId = System.Diagnostics.Activity.Current?.Id 
                        ?? context.TraceIdentifier;
        problem.Extensions.Add("traceId", traceId);
        problem.Extensions.Add("exception", exception.GetType().Name);

        var options = new JsonSerializerOptions 
        { 
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase 
        };

        await context.Response.WriteAsync(
            JsonSerializer.Serialize(problem, options)
        );
    }

    private async Task LogErrorToDb(
        HttpContext context, 
        IRepository<ErrorLog> errorRepo, 
        Exception ex
    )
    {
        var log = new ErrorLog
        {
            Message = ex.Message,
            StackTrace = ex.StackTrace,
            Path = context.Request.Path,
            Method = context.Request.Method,
            UserEmail = context
                        .User
                        .FindFirstValue(ClaimTypes.Email) 
                        ?? "Guest",
            Timestamp = DateTime.UtcNow
        };

        try
        {
            await errorRepo.AddAsync(log);
            await errorRepo.SaveChangesAsync();
        }
        catch (Exception dbEx)
        {
            Console.WriteLine($"CRITICAL: Database logging failed: " +
                $"{dbEx.Message}");
        }
    }
}