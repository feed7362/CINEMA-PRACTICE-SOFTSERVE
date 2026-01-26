
using Backend.Services.DTOs.Booking;
using Backend.Services.DTOs;

public interface IBookingService
{
    Task<BookingResponseDto> CreateBookingAsync(CreateBookingDto dto, int userId);
    Task<BookingResponseDto?> GetBookingByIdAsync(int bookingId, int userId);
    Task<BookingDetailDto?> GetBookingDetailsByIdAsync(int bookingId, int userId);
    Task<PagedResponse<BookingSummaryDto>> GetUserBookingHistoryAsync(int userId, int page = 1, int pageSize = 10);
}