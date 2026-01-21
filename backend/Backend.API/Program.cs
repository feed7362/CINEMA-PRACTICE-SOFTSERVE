using Backend.API.Extensions;
using Backend.Data;
using System.Text;
using Backend.Data.Repositories;
using Backend.Domain.Interfaces;
using Backend.Services.Interfaces;
using Backend.Services.Services;
using Microsoft.OpenApi;

Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
Console.OutputEncoding = Encoding.UTF8;
Console.InputEncoding = Encoding.UTF8;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IHallService, HallService>();
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddDatabaseServices(builder.Configuration);
builder.Services.AddIdentityServices();
builder.Services.AddOpenApi();
builder.Services.AddScoped(
    typeof(IRepository<>),
    typeof(Repository<>)
);
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, ct) =>
    {
        document.Info = new OpenApiInfo
        {
            Title = "My API",
            Version = "v1",
            Description = "Clean Minimal API",
            Contact = new OpenApiContact
            {
                Name = "Your Name",
                Email = "you@email.com"
            },
            License = new OpenApiLicense
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

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    await app.ApplyMigrationsAndSeedAsync();
}

app.Lifetime.ApplicationStarted.Register(() => { Console.WriteLine("Application started"); });

app.Lifetime.ApplicationStopping.Register(() => { Console.WriteLine("Application stopping"); });
app.SwaggerUi();


app.MapHallEndpoints();
app.MapSessionEndpoints();

app.Run();