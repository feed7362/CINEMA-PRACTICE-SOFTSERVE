using Backend.Services.DTOs;
using Backend.Services.DTOs.Booking;

namespace Backend.Services.Interfaces;

public interface IBookingService
{
    Task<BookingResponseDto> LockBookingAsync(
            CreateBookingDto dto, 
            int userId
        );
    Task<BookingResponseDto?> GetBookingByIdAsync(
            int bookingId, 
            int userId
        );
    Task<BookingDetailResponseDto?> GetBookingDetailsByIdAsync(
            int bookingId, 
            int userId
        );
    Task<PagedResponse<BookingSummaryResponseDto>> GetUserBookingHistoryAsync(
            int userId, 
            int page = 1, int 
            pageSize = 10
        );
    Task<BookingResponseDto> ConfirmBookingAsync(
            ConfirmBookingRequestDto dto, 
            int userId
        );
    Task<BookingResponseDto> ApplyPromocodeAsync(int bookingId, string code, int userId);
    Task<RefundResponseDto> RefundBookingAsync(int bookingId, int userId);
}