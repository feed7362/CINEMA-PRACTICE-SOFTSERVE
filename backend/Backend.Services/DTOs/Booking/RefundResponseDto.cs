namespace Backend.Services.DTOs.Booking;

public record RefundResponseDto(
    int BookingId,
    string Status,
    string? RefundId,
    decimal AmountRefunded,
    DateTime RefundTime
);