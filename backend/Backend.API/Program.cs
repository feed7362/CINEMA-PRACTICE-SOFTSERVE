using System.Text;
using Backend.API;
using Backend.API.Extensions;
using Backend.Data;
using Stripe;
using Backend.API.Controllers;
using Backend.Services.Interfaces;
using Backend.Services.Services;

Encoding.RegisterProvider(
    CodePagesEncodingProvider.Instance
   );

Console.OutputEncoding = Encoding.UTF8;
Console.InputEncoding = Encoding.UTF8;

var builder = WebApplication.CreateBuilder(args);

var allowedOrigins = builder
    .Configuration
    .GetSection("AllowedOrigins")
    .Get<string[]>();

//Services
builder.Services
    .AddApplicationServices() //Hall, Ticket, Movie, Booking, Session, TokenService
    .AddInfrastructure(builder.Configuration) //Database, Identity, Repositories
    .AddSwaggerWithJwt() //OpenAPI + JWT security
    .AddCorsPolicy(allowedOrigins) //CORS
    .AddJwtAuthentication(builder.Configuration); //JWT auth

builder.Services.AddScoped<IGenreService, GenreService>();
builder.Services.AddScoped<IStudioService, StudioService>();
StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi("/swagger/{documentName}/swagger.json");
    app.UseSwaggerUI();
    await app.ApplyMigrationsAndSeedAsync();
}

app.UseMiddleware<Backend.API.Middleware.ExceptionHandlingMiddleware>();

app.UseCors("Default");

app.UseAuthentication();
app.UseAuthorization();

//Endpoints
app.MapApplicationEndpoints();
app.MapGenreEndpoints();
app.MapStudiosEndpoints();
app.MapContactEndpoints();

app.Lifetime.ApplicationStarted.Register(() => { 
    Console.WriteLine("Application started"); 
});
app.Lifetime.ApplicationStopping.Register(() => { 
    Console.WriteLine("Application stopping"); 
});

app.Run();