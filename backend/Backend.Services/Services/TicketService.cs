using Ardalis.Specification;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs;
using Backend.Services.DTOs.Ticket;
using Backend.Services.Specifications;

namespace Backend.Services;

public class TicketService : ITicketService
{
    private readonly IRepository<Ticket> _ticketRepository;

    public TicketService(
        IRepository<Ticket> ticketRepository
        )
    {
        _ticketRepository = ticketRepository;
    }
    public async Task<TicketResponseDto?> GetTicketByIdAsync(int ticketId, int userId)
    {
        var ticket = await _ticketRepository.GetFirstBySpecAsync(new TicketByIdAndUserSpec(ticketId, userId));

        if (ticket == null) return null;

        return MapToTicketResponse(ticket);
    }

    public async Task<PagedResponse<TicketResponseDto>> GetUserTicketsAsync(int userId, int page = 1, int pageSize = 10)
    {
        var countSpec = new Specification<Ticket>();
        countSpec.Query.Where(t => t.Booking.ApplicationUserId == userId);
        int totalCount = await _ticketRepository.CountAsync(countSpec);

        
        var pagedSpec = new UserTicketsPagedSpec(userId, page, pageSize);
        var tickets = await _ticketRepository.GetListBySpecAsync(pagedSpec);

        
        var items = tickets.Select(MapToTicketResponse).ToList();

        return new PagedResponse<TicketResponseDto>(items, totalCount, page, pageSize);
    }

    private TicketResponseDto MapToTicketResponse(Ticket ticket)
    {
        return new TicketResponseDto(
            ticket.Id,
            ticket.Booking.Session.Movie.TitleUKR,
            ticket.Booking.Session.Hall.Name,
            ticket.Seat.RowNumber,
            ticket.Seat.SeatNumber,
            ticket.Seat.SeatType.ToString(),
            ticket.Booking.Session.StartTime,
            ticket.Booking.Status.ToString()
        );
    }
}