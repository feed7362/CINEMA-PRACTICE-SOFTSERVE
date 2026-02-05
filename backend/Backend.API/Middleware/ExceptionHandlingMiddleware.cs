using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Net;
using System.Security.Claims;
using System.Text.Json;

namespace Backend.API.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{

    public async Task InvokeAsync(HttpContext context, IRepository<ErrorLog> errorRepo)
    {
        try
        {
            await next(context);

            if (context.Response.StatusCode == StatusCodes.Status404NotFound)
            {
                var path = context.Request.Path.Value?.ToLower();

                // Don't log common bot targets or browser noise
                if (path != null && !path.Contains("favicon") && !path.Contains(".php") && !path.Contains(".env"))
                {
                    await LogErrorToDb(context, errorRepo, new Exception("404 Not Found: " + path));
                }
            }
        }
        catch (Exception ex)
        {
            await LogErrorToDb(context, errorRepo, ex);

            await HandleExceptionAsync(context, ex);
        }
    }
    private async Task LogErrorToDb(HttpContext context, IRepository<ErrorLog> errorRepo, Exception ex)
    {

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