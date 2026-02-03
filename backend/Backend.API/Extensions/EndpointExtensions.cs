using Backend.API.Controllers;

namespace Backend.API.Extensions;

public static class EndpointExtensions
{
    public static void MapApplicationEndpoints(this WebApplication app)
    {
        app.MapAuthEndpoints();
        app.MapHallEndpoints();
        app.MapMovieEndpoints();
        app.MapSessionEndpoints();
        app.MapBookingEndpoints();
        app.MapTicketEndpoints();
        app.MapAdminEndpoints();
        app.MapAdminLogEndpoints();
    }
}
