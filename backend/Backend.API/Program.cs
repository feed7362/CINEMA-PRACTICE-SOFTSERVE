using Backend.API.Controllers;
using Backend.API.Extensions;
using Backend.Data;
using Backend.Data.Repositories;
using Backend.Domain.Interfaces;
using Backend.Services.Interfaces;
using Backend.Services.Services;
using Backend.Services.Validators.Hall;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Text;
using Backend.Services;

Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
Console.OutputEncoding = Encoding.UTF8;
Console.InputEncoding = Encoding.UTF8;

var builder = WebApplication.CreateBuilder(args);

// --- Services Registration ---
builder.Services.AddScoped<IHallService, HallService>();
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<ITicketService, TicketService>();
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddDatabaseServices(builder.Configuration);
builder.Services.AddIdentityServices();

builder.Services.AddScoped(
    typeof(IRepository<>),
    typeof(Repository<>)
);

// OpenAPI configuration
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, ct) =>
    {
        document.Info = new OpenApiInfo
        {
            Title = "My API",
            Version = "v1",
            Description = "Clean Minimal API"
        };

        var schemeName = "Bearer";
        var securityScheme = new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description = "Enter JWT Bearer token"
        };

        // Safety Initializations
        document.Components ??= new OpenApiComponents();
        if (document.Components.SecuritySchemes == null)
        {
            document.Components.SecuritySchemes = new Dictionary<string, IOpenApiSecurityScheme>();
        }

        if (!document.Components.SecuritySchemes.ContainsKey(schemeName))
        {
            document.Components.SecuritySchemes.Add(schemeName, securityScheme);
        }

        var requirement = new OpenApiSecurityRequirement();
        var schemeReference = new OpenApiSecuritySchemeReference(schemeName, document);

        requirement.Add(schemeReference, new List<string>());

        document.Security = new List<OpenApiSecurityRequirement> { requirement };

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

// --- Middleware Pipeline ---
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options => {
        options.SwaggerEndpoint("/openapi/v1.json", "v1");
    });

    await app.ApplyMigrationsAndSeedAsync();
}

app.UseHttpsRedirection();
app.UseCors("Default");

app.UseAuthentication();
app.UseAuthorization();

// Application Lifetime hooks
app.Lifetime.ApplicationStarted.Register(() => { Console.WriteLine("Application started"); });
app.Lifetime.ApplicationStopping.Register(() => { Console.WriteLine("Application stopping"); });

// --- Endpoint Mapping ---
app.MapAuthEndpoints();
app.MapHallEndpoints();
app.MapMovieEndpoints();
app.MapSessionEndpoints();
app.MapBookingEndpoints();
app.MapTicketEndpoints();

app.Run();