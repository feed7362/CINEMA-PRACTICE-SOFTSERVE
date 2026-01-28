namespace Backend.Services.DTOs.Booking;


public record BookingResponseDto(
    int Id,
    int ApplicationUserId,
    int SessionId,
    DateTime BookingTime,
    string Status,
    string? ClientSecret = null,
    string? PaymentIntentId = null
);