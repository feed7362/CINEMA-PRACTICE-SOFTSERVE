using AutoMapper;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Booking;
using System.Linq;

namespace Backend.Services.Mappings;

public class BookingProfile : Profile
{
    public BookingProfile()
    {

        CreateMap<Session, SessionShortDto>()
            .ConstructUsing(s => new SessionShortDto(
                s.Id,
                s.Movie.TitleUkr ?? "Невідомо",
                s.Hall.Name ?? "Зал не вказано",
                s.StartTime
            ));


        CreateMap<Ticket, TicketDetailDto>()
            .ConstructUsing(t => new TicketDetailDto(
                t.Id,
                t.Seat.RowNumber,
                t.Seat.SeatNumber,
                t.Seat.SeatType.ToString(),
                t.FinalPrice,
                t.Discount != null ? t.Discount.Type.ToString() : "ВІДСУТНЯ"
            ));

        CreateMap<Booking, BookingResponseDto>()
            .ConstructUsing(b => new BookingResponseDto(
                b.Id,
                b.ApplicationUserId,
                b.SessionId,
                b.BookingTime,
                b.ExpirationTime,
                b.Status.ToString(),
                b.Tickets.Sum(t => t.FinalPrice),
                null, // ClientSecret (Stripe)
                b.PaymentIntentId,
                null // AppliedPromoCode
            ));


        CreateMap<Booking, BookingSummaryResponseDto>()
            .ConstructUsing(src => new BookingSummaryResponseDto(
                src.Id,
                src.Session.Movie.TitleUkr ?? "Невідомо",
                src.Session.StartTime,
                src.BookingTime,
                src.Tickets.Count,
                src.Tickets.Sum(t => t.FinalPrice),
                src.Status.ToString()
            ));

        CreateMap<Booking, BookingDetailResponseDto>()
            .ConstructUsing((src, context) => new BookingDetailResponseDto(
                src.Id,
                src.BookingTime,
                src.ExpirationTime,
                src.Status.ToString(),
                src.Tickets.Sum(t => t.FinalPrice),
                context.Mapper.Map<SessionShortDto>(src.Session),
                context.Mapper.Map<List<TicketDetailDto>>(src.Tickets),
                src.PaymentIntentId,
                null
            ));
    }
}