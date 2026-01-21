using Backend.API.Extensions;
using Backend.Data;
using Backend.Data.Repositories;
using Backend.Domain.Interfaces;
using Backend.Services.Interfaces;
using Backend.Services.Services;
using FluentValidation;
using Microsoft.OpenApi;
using System.Text;
using Backend.API.Controllers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Backend.Services.Validators.Hall;


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

builder.Services.AddValidatorsFromAssemblyContaining<CreateHallDtoValidator>();
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});


builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    await app.ApplyMigrationsAndSeedAsync();
}

app.Lifetime.ApplicationStarted.Register(() => { Console.WriteLine("Application started"); });

app.Lifetime.ApplicationStopping.Register(() => { Console.WriteLine("Application stopping"); });
app.SwaggerUi();

app.MapAuthEndpoints();
app.MapHallEndpoints();
app.MapSessionEndpoints();

app.Run();