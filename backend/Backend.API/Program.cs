using System.Text;
using Backend.API;
using Backend.API.Extensions;
using Backend.Data;
using Stripe;

Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
Console.OutputEncoding = Encoding.UTF8;
Console.InputEncoding = Encoding.UTF8;

var builder = WebApplication.CreateBuilder(args);

//Services
builder.Services
    .AddApplicationServices() //Hall, Ticket, Movie, Booking, Session, TokenService
    .AddInfrastructure(builder.Configuration) //Database, Identity, Repositories
    .AddSwaggerWithJwt() //OpenAPI + JWT security
    .AddCorsPolicy() //CORS
    .AddJwtAuthentication(builder.Configuration); //JWT auth

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

app.Lifetime.ApplicationStarted.Register(() => { Console.WriteLine("Application started"); });
app.Lifetime.ApplicationStopping.Register(() => { Console.WriteLine("Application stopping"); });

app.Run();