using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Microsoft.EntityFrameworkCore;

namespace Backend.API.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred during transaction processing.");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        if (!context.Response.HasStarted)
        {
            context.Response.Clear(); // очищаємо будь-які частково відправлені дані
            context.Response.ContentType = "application/json";

            var traceId = System.Diagnostics.Activity.Current?.Id ?? context.TraceIdentifier;

            var (statusCode, message) = exception switch
            {
                InvalidOperationException => (HttpStatusCode.Conflict, exception.Message),
                DbUpdateException { InnerException: PostgresException { SqlState: "40001" } }
                    => (HttpStatusCode.ServiceUnavailable, "Concurrency conflict: Please try again."),
                KeyNotFoundException => (HttpStatusCode.NotFound, exception.Message),
                _ => (HttpStatusCode.InternalServerError, "An unexpected server error occurred.")
            };

            context.Response.StatusCode = (int)statusCode;

            var response = new ProblemDetails
            {
                Title = exception is InvalidOperationException ? "Domain Logic Conflict" : statusCode.ToString(),
                Status = (int)statusCode,
                Detail = message,
                Instance = context.Request.Path
            };

            response.Extensions.Add("traceId", traceId);

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
        else
        {
            // Відповідь уже почалася → не можна змінювати заголовки
            // Просто логування
            Console.WriteLine($"Cannot write exception to response: {exception.Message}");
        }
    }
}