namespace Backend.API.Extensions
{
    public static class SwaggerExtensions
    {
        public static void SwaggerUi(this IApplicationBuilder app)
        {
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/openapi/v1.json", "My API v1");
                options.RoutePrefix = "swagger";       // URL: /swagger
                options.DocumentTitle = "My API Docs"; // Browser tab title
            });
        }
    }
}