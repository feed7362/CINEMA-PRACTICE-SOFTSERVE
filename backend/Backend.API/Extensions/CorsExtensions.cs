namespace Backend.API.Extensions;

public static class CorsExtensions
{
    public static IServiceCollection AddCorsPolicy(this IServiceCollection services, string[] allowedOrigins)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("Default", policy =>
            {
                policy.WithOrigins(allowedOrigins ?? Array.Empty<string>())
                 .WithMethods("GET", "POST", "PUT", "DELETE")
                 .WithHeaders("Content-Type", "Authorization");
            });
        });

        return services;
    }
}