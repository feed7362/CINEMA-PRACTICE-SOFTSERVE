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
    ILogger<ExceptionHandlingMiddleware> logger
)
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
                var path = context.Request.Path.Value?.ToLower();

                // Don't log common bot targets or browser noise
                if (path != null && !path.Contains("favicon") 
                    && !path.Contains(".php") 
                    && !path.Contains(".env")
                )
                {
                    await LogErrorToDb(
                        context, 
                        errorRepo, 
                        new Exception("404 Not Found: " + path)
                    );
                }
            }
        }
        catch (Exception ex)
        {
            await LogErrorToDb(context, errorRepo, ex);

            await HandleExceptionAsync(context, ex);
        }
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
            UserEmail = context.User.FindFirstValue(ClaimTypes.Email) ?? "Guest",
            Timestamp = DateTime.UtcNow
        };

        try
        {
            errorRepo.Insert(log);
            await errorRepo.SaveChangesAsync();
        }
        catch
        {
            Console.WriteLine($"CRITICAL: Could not " +
                $"log error to DB: {ex.Message}");
        }
    }
    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        var traceId = System.Diagnostics.Activity.Current?.Id ?? context.TraceIdentifier;

        var (statusCode, title) = exception switch
        {
            EntityNotFoundException => (HttpStatusCode.NotFound, "Resource Not Found"),
            BookingConflictException => (HttpStatusCode.Conflict, "Business Rule Violation"),
            PaymentRequiredException => (HttpStatusCode.PaymentRequired, "Stripe Payment Error"),

            KeyNotFoundException => (HttpStatusCode.NotFound, "Reference Not Found"),
            DbUpdateException { InnerException: PostgresException { SqlState: "40001" } }
                => (HttpStatusCode.ServiceUnavailable, "Concurrency Conflict"),

            _ => (HttpStatusCode.InternalServerError, "Server Error")
        };

        context.Response.StatusCode = (int)statusCode;

        var response = new ProblemDetails
        {
            Title = title,
            Status = (int)statusCode,
            Detail = exception.Message,
            Instance = context.Request.Path
        };

        response.Extensions.Add("traceId", traceId);

        response.Extensions.Add("exceptionType", exception.GetType().Name);

        return context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}