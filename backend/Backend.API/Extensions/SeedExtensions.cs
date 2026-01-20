using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.API.Extensions;

public static class SeedExtensions
{
    public static async Task ApplyMigrationsAndSeedAsync(this IHost app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            var context = services.GetRequiredService<ApplicationContext>();

            var pendingMigrations = await context.Database.GetPendingMigrationsAsync();
            if (pendingMigrations.Any())
            {
                await context.Database.MigrateAsync();
            }
            await DataSeeder.SeedDataAsync(context);
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<ApplicationContext>>();
            logger.LogError(ex, "Виникла помилка під час міграції або наповнення бази даних (Seeding).");

            throw;
        }
    }
}