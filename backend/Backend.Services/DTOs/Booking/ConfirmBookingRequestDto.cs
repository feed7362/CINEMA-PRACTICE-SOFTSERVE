namespace Backend.Services.DTOs.Booking;

public record ConfirmBookingRequestDto(
    int BookingId,
    string PaymentIntentId
);