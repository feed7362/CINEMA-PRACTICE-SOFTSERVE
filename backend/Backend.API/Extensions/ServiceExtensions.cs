using Backend.API.Context;
using Backend.Domain.Interfaces;
using Backend.Services;
using Backend.Services.Interfaces;
using Backend.Services.Services;
using Backend.Services.Services.BackgroundServices;
using Backend.Services.Validators.Hall;
using FluentValidation;

namespace Backend.API;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IHallService, HallService>();
        services.AddScoped<ISessionService, SessionService>();
        services.AddScoped<IBookingService, BookingService>();
        services.AddScoped<ITicketService, TicketService>();
        services.AddScoped<IMovieService, MovieService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IAdminStatsService, AdminStatsService>();
        services.AddScoped<IMovieRecommendationService, MovieRecommendationService>();
        services.AddScoped<IAdminLogService, AdminLogService>();
        services.AddScoped<IUserContext, UserContext>();
        services.AddHttpContextAccessor();
        services.AddHostedService<ExpiredBookingWorker>();

        services.AddValidatorsFromAssemblyContaining<CreateHallDtoValidator>();

        return services;
    }
}