namespace Backend.Services.DTOs.Booking;
public record BookingSummaryResponseDto(
    int Id,
    string MovieTitle,
    DateTime StartTime,
    DateTime BookingTime,
    int TicketCount,
    decimal TotalAmount,
    string Status
);