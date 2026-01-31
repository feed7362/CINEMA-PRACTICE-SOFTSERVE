using Ardalis.Specification;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Backend.Services.Services.BackgroundServices;

public class ExpiredBookingWorker(IServiceProvider serviceProvider, ILogger<ExpiredBookingWorker> logger)
    : BackgroundService
{
    private readonly TimeSpan _checkInterval = TimeSpan.FromMinutes(1);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Expired Booking Worker is starting.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await CancelExpiredBookingsAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while canceling expired bookings.");
            }

            await Task.Delay(_checkInterval, stoppingToken);
        }
    }

    private async Task CancelExpiredBookingsAsync()
    {
        using var scope = serviceProvider.CreateScope();
        var bookingRepository = scope.ServiceProvider.GetRequiredService<IRepository<Booking>>();

        logger.LogInformation("Checking for expired bookings at {Time}", DateTime.UtcNow);

        var expiredSpec = new Specification<Booking>();
        expiredSpec.Query
            .Where(b => b.Status == BookingStatus.PENDING && b.ExpirationTime < DateTime.UtcNow);

        var expiredBookings = await bookingRepository.GetListBySpecAsync(expiredSpec);

        if (expiredBookings.Any())
        {
            foreach (var booking in expiredBookings)
            {
                booking.Status = BookingStatus.CANCELED;
            }

            await bookingRepository.SaveChangesAsync();
            logger.LogInformation("Successfully canceled {Count} expired bookings.", expiredBookings.Count);
        }
    }
}