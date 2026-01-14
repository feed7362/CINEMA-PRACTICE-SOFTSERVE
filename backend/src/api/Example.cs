using backend.schemas;

namespace backend.api;

public static class WeatherEndpoints
{
    public static void MapWeatherEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild",
            "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        var group = endpoints
            .MapGroup("/api/weather")
            .WithTags("Weather");

        group.MapGet("/weatherforecast", () =>
            {
                return Enumerable.Range(1, 5)
                    .Select(index => new WeatherForecast(
                        DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                        Random.Shared.Next(-20, 55),
                        summaries[Random.Shared.Next(summaries.Length)]
                    ))
                    .ToArray();
            })
            .WithName("GetWeatherForecast")
            .WithSummary("Returns Weather Forecast")
            .WithDescription("returns a list of weather forecasts with random data");
    }
}