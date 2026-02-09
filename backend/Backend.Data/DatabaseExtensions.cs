using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public static class DatabaseExtensions
{
    public static void AddDatabaseServices(
            this IServiceCollection services, 
            IConfiguration configuration
        )
    {
        services.AddDbContext<ApplicationContext>(options =>
        {
            options.UseNpgsql(
                configuration.GetConnectionString("Database")
            );
        });
    }
}