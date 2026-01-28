using Backend.Services.DTOs;
using Backend.Services.DTOs.Booking;

public interface IBookingService
{
    Task<BookingResponseDto> LockBookingAsync(CreateBookingDto dto, int userId);
    Task<BookingResponseDto?> GetBookingByIdAsync(int bookingId, int userId);
    Task<BookingDetailDto?> GetBookingDetailsByIdAsync(int bookingId, int userId);
    Task<PagedResponse<BookingSummaryDto>> GetUserBookingHistoryAsync(int userId, int page = 1, int pageSize = 10);
    Task<BookingResponseDto> ConfirmBookingAsync(ConfirmBookingDto dto, int userId);
}