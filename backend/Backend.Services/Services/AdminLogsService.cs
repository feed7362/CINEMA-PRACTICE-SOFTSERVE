using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs;
using Backend.Services.DTOs.Admin;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;
using System.Text.Json;
namespace Backend.Services.Services;

public class AdminLogService(
    IRepository<AuditLog> auditRepository,
    IRepository<ErrorLog> errorRepository,
    IMapper mapper) : IAdminLogService
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

        var items = mapper.Map<List<AuditLogDto>>(logs);

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

        var items = mapper.Map<List<ErrorLogDto>>(logs);

        return new PagedResponse<ErrorLogDto>(items, total, page, pageSize);
    }

    public async Task<ErrorLog?> GetErrorDetailAsync(
            int id
        )
    {
        var error = await errorRepository.GetByIdAsync(id);

        if (error == null)
            throw new EntityNotFoundException("Лог помилки", id);

        return error;
    }
}