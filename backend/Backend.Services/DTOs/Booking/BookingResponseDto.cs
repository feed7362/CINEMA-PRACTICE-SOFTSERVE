namespace Backend.Services.DTOs.Booking;


public record BookingResponseDto(
    int Id,
    int ApplicationUserId,
    int SessionId,
    DateTime BookingTime,
    DateTime ExpirationTime,
    string Status,
    decimal TotalAmount,
    string? ClientSecret = null,
    string? PaymentIntentId = null,
    string? AppliedPromoCode = null
);