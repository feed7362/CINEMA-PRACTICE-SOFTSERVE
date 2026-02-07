using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs;
using Backend.Services.DTOs.Admin;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;
using System.Text.Json;
namespace Backend.Services.Services;

public class AdminLogService(
    IRepository<AuditLog> auditRepository,
    IRepository<ErrorLog> errorRepository) : IAdminLogService
{
    public async Task<PagedResponse<AuditLogDto>> GetAuditLogsAsync(
            int page, 
            int pageSize, 
            string? email = null
        )
    {
        var filterSpec = new AuditLogsByEmailSpec(email);
        var pagedSpec = new AuditLogsByEmailPagedSpec(page, pageSize, email);

        var total = await auditRepository.CountAsync(filterSpec);
        var logs = await auditRepository.GetListBySpecAsync(pagedSpec);

        var items = logs.Select(l => new AuditLogDto(
            l.Id,
            l.TableName,
            l.Action,
            l.UserEmail,
            l.Timestamp,
            JsonSerializer.Deserialize<object>(l.Changes) ?? new { }
        )).ToList();

        return new PagedResponse<AuditLogDto>(items, total, page, pageSize);
    }

    public async Task<PagedResponse<ErrorLogDto>> GetErrorLogsAsync(
            int page, 
            int pageSize, 
            string? email = null, 
            string? path = null
        )
    {
        var filterSpec = new ErrorLogsByEmailAndPathSpec(email, path);
        var pagedSpec = new ErrorLogsByEmailAndPathPagedSpec(page, pageSize, email, path);

        var total = await errorRepository.CountAsync(filterSpec);
        var logs = await errorRepository.GetListBySpecAsync(pagedSpec);

        var items = logs.Select(l => new ErrorLogDto(
            l.Id,
            l.Message,
            l.Path,
            l.UserEmail,
            l.Timestamp,
            l.Method
        )).ToList();

        return new PagedResponse<ErrorLogDto>(items, total, page, pageSize);
    }

    public async Task<ErrorLog?> GetErrorDetailAsync(
            int id
        ) => await errorRepository.GetByIdAsync(id);
}