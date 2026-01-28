using Backend.Services;
using Backend.Services.Interfaces;
using Backend.Services.Services;
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

        services.AddValidatorsFromAssemblyContaining<CreateHallDtoValidator>();

        return services;
    }
}