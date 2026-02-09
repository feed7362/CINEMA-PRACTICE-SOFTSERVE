namespace Backend.Services.DTOs.Booking;

public record BookingDetailResponseDto(
    int Id,
    DateTime BookingTime,
    DateTime ExpirationTime,
    string Status,
    decimal TotalPrice,
    SessionShortDto Session,
    List<TicketDetailDto> Tickets,
    string? PaymentIntentId = null,
    string? ClientSecret = null
);

public record SessionShortDto(
    int Id,
    string MovieTitle,
    string HallName,
    DateTime StartTime
);

public record TicketDetailDto(
    int Id,
    int RowNumber,
    int SeatNumber,
    string SeatType,
    decimal FinalPrice,
    string DiscountType
);