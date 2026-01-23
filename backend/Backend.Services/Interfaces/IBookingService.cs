
using Backend.Services.DTOs.Booking;

public interface IBookingService
{
    Task<BookingResponseDto> CreateBookingAsync(CreateBookingDto dto, int userId);
    Task<BookingResponseDto?> GetBookingByIdAsync(int bookingId, int userId);
    Task<BookingDetailDto?> GetBookingDetailsByIdAsync(int bookingId, int userId);
}