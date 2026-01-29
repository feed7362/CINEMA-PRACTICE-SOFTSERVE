using Microsoft.OpenApi;

namespace Backend.API.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwaggerWithJwt(this IServiceCollection services)
    {
        services.AddOpenApi(options =>
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

                document.Components ??= new OpenApiComponents();
                document.Components.SecuritySchemes ??= new Dictionary<string, IOpenApiSecurityScheme>();

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

        return services;
    }
}