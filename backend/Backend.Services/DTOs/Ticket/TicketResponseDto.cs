namespace Backend.Services.DTOs.Ticket;

public record TicketResponseDto(
    int TicketId,
    string MovieTitle,
    string HallName,
    int RowNumber,
    int SeatNumber,
    string SeatType,
    DateTime StartTime,
    string Status // Linked to the Booking status
);