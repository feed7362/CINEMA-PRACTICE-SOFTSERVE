using Ardalis.Specification;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Backend.Services.BackgroundServices;

public class ExpiredBookingWorker : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<ExpiredBookingWorker> _logger;
    private readonly TimeSpan _checkInterval = TimeSpan.FromMinutes(1);

    public ExpiredBookingWorker(IServiceProvider serviceProvider, ILogger<ExpiredBookingWorker> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Expired Booking Worker is starting.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await CancelExpiredBookingsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while canceling expired bookings.");
            }

            await Task.Delay(_checkInterval, stoppingToken);
        }
    }

    private async Task CancelExpiredBookingsAsync()
    {
        using var scope = _serviceProvider.CreateScope();
        var bookingRepository = scope.ServiceProvider.GetRequiredService<IRepository<Booking>>();

        _logger.LogInformation("Checking for expired bookings at {Time}", DateTime.UtcNow);

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
            _logger.LogInformation("Successfully canceled {Count} expired bookings.", expiredBookings.Count);
        }
    }
}