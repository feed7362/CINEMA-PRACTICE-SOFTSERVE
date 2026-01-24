

namespace Backend.Services.DTOs.Booking;
public record BookingSummaryDto(
    int Id,
    string MovieTitle,
    DateTime StartTime,
    int TicketCount,
    decimal TotalAmount,
    string Status
);

public record PagedResponse<T>(List<T> Items, int TotalCount, int PageNumber, int PageSize);