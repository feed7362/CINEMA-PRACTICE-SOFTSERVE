

namespace Backend.Services.DTOs.Booking;
public record BookingSummaryDto(
    int Id,
    string MovieTitle,
    DateTime StartTime,
    int TicketCount,
    decimal TotalAmount,
    string Status
);