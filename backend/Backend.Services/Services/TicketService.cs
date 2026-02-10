using Ardalis.Specification;
using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs;
using Backend.Services.DTOs.Ticket;
using Backend.Services.Interfaces;
using Backend.Services.Specifications;

namespace Backend.Services.Services;

public class TicketService(
    IRepository<Ticket> ticketRepository,
    IMapper mapper
) : ITicketService
{
    public async Task<TicketResponseDto?> GetTicketByIdAsync(
        int ticketId,
        int userId
    )
    {
        var ticket = await ticketRepository.GetFirstBySpecAsync(
            new TicketByIdAndUserIdSpec(ticketId, userId)
        );

        return ticket == null
            ? throw new EntityNotFoundException("Квиток", ticketId)
            : mapper.Map<TicketResponseDto>(ticket);
    }

    public async Task<PagedResponse<TicketResponseDto>> GetUserTicketsAsync(
        int userId,
        int page = 1,
        int pageSize = 10
    )
    {
        var countSpec = new Specification<Ticket>();
        countSpec.Query.Where(t => t.Booking.ApplicationUserId == userId);
        var totalCount = await ticketRepository.CountAsync(countSpec);


        var pagedSpec = new TicketsByUserIdPagedSpec(userId, page, pageSize);
        var tickets = await ticketRepository.GetListBySpecAsync(pagedSpec);


        var items = mapper.Map<List<TicketResponseDto>>(tickets);

        return new PagedResponse<TicketResponseDto>(
            items,
            totalCount,
            page,
            pageSize
        );
    }
}