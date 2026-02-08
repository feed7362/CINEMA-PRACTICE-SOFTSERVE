using Backend.Services.Interfaces;

namespace Backend.API.Controllers;

internal static class AdminLogEndpoints
{
    public static void MapAdminLogEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup("/api/admin/logs")
            .WithTags("Admin Analytics")
            .RequireAuthorization(policy => policy.RequireRole("Admin"));

        group.MapGet("/audit", async (
            IAdminLogService service,
            int page = 1,
            int pageSize = 20,
            string? email = null) 

        => Results.Ok(await service.GetAuditLogsAsync(page, pageSize, email)))

            .WithName("GetAuditLogs")
            .WithSummary("Retrieve audit logs with optional email filtering");

        group.MapGet("/errors", async (
            IAdminLogService service,
            int page = 1,
            int pageSize = 20,
            string? email = null,
            string? path = null) 
        
        => Results.Ok(await service.GetErrorLogsAsync(
            page, 
            pageSize, 
            email, 
            path)
        ))
            
            .WithName("GetErrorLogs")
            .WithSummary("Retrieve error logs with optional filtering " +
            "by email or request path");

        group.MapGet("/errors/{id:int}", async (
            int id, 
            IAdminLogService service
        ) =>
        {
            var error = await service.GetErrorDetailAsync(id);
            return Results.Ok(error);
        })
            .WithName("GetErrorLogById")
            .WithSummary("Get error log details")
            .WithDescription("Returns the full details of a specific error " +
            "log, including the stack trace for debugging purposes.");
    }
}