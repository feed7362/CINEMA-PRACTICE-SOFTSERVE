namespace Backend.Services.DTOs.Booking;


public record BookingResponseDto(
    int Id,
    int ApplicationUserId,
    int SessionId,
    DateTime BookingTime,
    DateTime ExpirationTime,
    string Status,
    string? ClientSecret = null,
    string? PaymentIntentId = null
);