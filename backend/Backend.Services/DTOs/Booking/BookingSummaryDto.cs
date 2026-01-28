

namespace Backend.Services.DTOs.Booking;
public record BookingSummaryDto(
    int Id,
    string MovieTitle,
    DateTime StartTime,
    DateTime BookingTime,
    int TicketCount,
    decimal TotalAmount,
    string Status
);