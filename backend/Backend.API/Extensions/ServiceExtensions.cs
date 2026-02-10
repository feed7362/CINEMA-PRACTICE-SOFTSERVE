using Backend.API.Context;
using Backend.Domain.Interfaces;
using Backend.Services.Mappings;
using Backend.Services.Interfaces;
using Backend.Services.Services;
using Backend.Services.Services.BackgroundServices;
using Backend.Services.Validators.Hall;
using FluentValidation;

namespace Backend.API;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services
    )
    {
        services.AddScoped<IGenreService, GenreService>();
        services.AddScoped<IStudioService, StudioService>();
        services.AddScoped<IHallService, HallService>();
        services.AddScoped<ISessionService, SessionService>();
        services.AddScoped<IBookingService, BookingService>();
        services.AddScoped<ITicketService, TicketService>();
        services.AddScoped<IMovieService, MovieService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IDiscountService, DiscountService>();
        services.AddScoped<IAdminStatsService, AdminStatsService>();
        services.AddScoped<IMovieRecommendationService, MovieRecommendationService>();
        services.AddScoped<IAdminLogService, AdminLogService>();
        services.AddAutoMapper(cfg =>
        {
            cfg.AddMaps(typeof(BookingProfile).Assembly);
        });
        services.AddScoped<IUserContext, UserContext>();
        services.AddHttpContextAccessor();
        services.AddHostedService<ExpiredBookingWorker>();

        services.AddValidatorsFromAssemblyContaining<CreateHallDtoValidator>();

        return services;
    }
}