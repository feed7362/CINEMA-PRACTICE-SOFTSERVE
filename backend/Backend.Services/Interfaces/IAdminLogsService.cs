using Backend.Domain.Entities;
using Backend.Services.DTOs;
using Backend.Services.DTOs.Admin;


namespace Backend.Services.Interfaces;

public interface IAdminLogService
{
    Task<PagedResponse<AuditLogDto>> GetAuditLogsAsync(
            int page, 
            int pageSize, 
            string? email = null
        );
    Task<PagedResponse<ErrorLogDto>> GetErrorLogsAsync(
            int page, 
            int pageSize, 
            string? email = null, 
            string? path = null
        );
    Task<ErrorLog?> GetErrorDetailAsync(int id);
}