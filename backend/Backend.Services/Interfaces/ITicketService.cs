using Backend.Services.DTOs;
using Backend.Services.DTOs.Ticket;

namespace Backend.Services.Interfaces;

public interface ITicketService
{
    Task<TicketResponseDto?> GetTicketByIdAsync(int ticketId, int userId);
    Task<PagedResponse<TicketResponseDto>> GetUserTicketsAsync(
            int userId, 
            int page = 1, 
            int pageSize = 10
        );
}