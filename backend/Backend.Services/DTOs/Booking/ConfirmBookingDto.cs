namespace Backend.Services.DTOs.Booking;

public record ConfirmBookingDto(
    int BookingId,
    string PaymentIntentId
);