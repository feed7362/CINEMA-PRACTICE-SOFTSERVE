using backend.api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, ct) =>
    {
        document.Info = new()
        {
            Title = "My API",
            Version = "v1",
            Description = "Clean Minimal API",
            Contact = new()
            {
                Name = "Your Name",
                Email = "you@email.com"
            },
            License = new()
            {
                Name = "MIT"
            }
        };

        return Task.CompletedTask;
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("Default", p =>
    {
        p.WithOrigins("https://localhost:5122")
            .WithMethods("GET", "POST")
            .WithHeaders("Content-Type", "Authorization");
    });
});


var app = builder.Build();

app.Lifetime.ApplicationStarted.Register(() =>
{
    Console.WriteLine("Application started");
});

app.Lifetime.ApplicationStopping.Register(() =>
{
    Console.WriteLine("Application stopping");
});

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "My API v1");
        options.RoutePrefix = "swagger";
        options.DocumentTitle = "My API Docs";
    });
}

app.MapWeatherEndpoints();

app.Run();
