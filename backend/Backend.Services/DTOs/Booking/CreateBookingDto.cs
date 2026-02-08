namespace Backend.Services.DTOs.Booking;

public record CreateBookingDto(
    int SessionId,
    List<int> SeatIds,
    string? Promocode = null
);