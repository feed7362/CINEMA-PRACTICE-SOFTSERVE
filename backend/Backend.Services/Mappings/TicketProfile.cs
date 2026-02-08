using AutoMapper;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Ticket;

namespace Backend.Services.Mappings;
public class TicketProfile : Profile
{
    public TicketProfile()
    {
        CreateMap<Ticket, TicketResponseDto>()
            .ForCtorParam("TicketId", 
                opt => opt.MapFrom(src => src.Id))
            .ForCtorParam("MovieTitle", 
                opt => opt.MapFrom(src => src.Booking.Session.Movie.TitleUkr))
            .ForCtorParam("HallName", 
                opt => opt.MapFrom(src => src.Booking.Session.Hall.Name))
            .ForCtorParam("RowNumber", 
                opt => opt.MapFrom(src => src.Seat.RowNumber))
            .ForCtorParam("SeatNumber", 
                opt => opt.MapFrom(src => src.Seat.SeatNumber))
            .ForCtorParam("SeatType", 
                opt => opt.MapFrom(src => src.Seat.SeatType.ToString()))
            .ForCtorParam("StartTime", 
                opt => opt.MapFrom(src => src.Booking.Session.StartTime))
            .ForCtorParam("Status", 
                opt => opt.MapFrom(src => src.Booking.Status.ToString()));
    }
}