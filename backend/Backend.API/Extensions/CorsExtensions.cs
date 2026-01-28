namespace Backend.API.Extensions;

public static class CorsExtensions
{
    public static IServiceCollection AddCorsPolicy(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("Default", p =>
            {
                p.WithOrigins("https://localhost:5122")
                 .WithMethods("GET", "POST")
                 .WithHeaders("Content-Type", "Authorization");
            });
        });

        return services;
    }
}
