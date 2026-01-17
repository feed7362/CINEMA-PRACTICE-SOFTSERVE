// using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Backend.Data;

namespace Backend.API.Extensions;

public static class DatabaseExtensions
{
    public static IServiceCollection AddDatabaseServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString("Database"));
        });

        // services.AddIdentity<User, IdentityRole<int>>(options =>
        //     {
        //         options.Password.RequireDigit = true;
        //         options.Password.RequireLowercase = true;
        //         options.Password.RequireUppercase = true;
        //         options.Password.RequiredLength = 6;
        //         options.Password.RequireNonAlphanumeric = false;
        //
        //         options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        //         options.Lockout.MaxFailedAccessAttempts = 5;
        //         options.Lockout.AllowedForNewUsers = true;
        //
        //         options.User.AllowedUserNameCharacters = "";
        //         options.User.RequireUniqueEmail = true;
        //     })
        //     .AddEntityFrameworkStores<ApplicationContext>()
        //     .AddDefaultTokenProviders();

        return services;
    }
}