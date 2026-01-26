using Backend.Services.Interfaces;
using Backend.Services.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Services;

public static class ServiceExtensions
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<IAdminStatsService, AdminStatsService>();
        services.AddScoped<IBookingService, BookingService>();
    }
}