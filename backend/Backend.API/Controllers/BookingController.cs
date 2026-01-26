using Backend.API.Extensions;
using Backend.Services.DTOs.Booking;
using System.Security.Claims;
using Backend.Services.Interfaces;

namespace Backend.API.Controllers;

internal static class BookingEndpoints
{
    public static void MapBookingEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints
            .MapGroup("/api/booking")
            .WithTags("Booking")
            .RequireAuthorization();


        group.MapGet("/", async (
        IBookingService bookingService,
        ClaimsPrincipal user,
        int page = 1,
        int pageSize = 10) =>
        {
            var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await bookingService.GetUserBookingHistoryAsync(userId, page, pageSize);
            return Results.Ok(result);
        })
            .WithName("GetUserBookingHistory")
            .WithSummary("Get paged bookings for the current user");


        group.MapPost("/", async (
                CreateBookingDto dto,
                IBookingService bookingService,
                ClaimsPrincipal user) =>
        {
            var userIdClaim = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim)) return Results.Unauthorized();

            var userId = int.Parse(userIdClaim);

            var result = await bookingService.CreateBookingAsync(dto, userId);

            return Results.Created($"/api/booking/{result.Id}", result);
        })
            .AddEndpointFilter<ValidationFilter<CreateBookingDto>>()
            .WithName("CreateBooking")
            .WithSummary("Create a new booking");

        group.MapGet("/{id:int}", async (
                int id,
                IBookingService bookingService,
                ClaimsPrincipal user) =>
        {
            var userIdClaim = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdClaim)) return Results.Unauthorized();

            var userId = int.Parse(userIdClaim);

            var booking = await bookingService.GetBookingByIdAsync(id, userId);

            return booking is null
                ? Results.NotFound()
                : Results.Ok(booking);
        })
            .WithName("GetBookingById")
            .WithSummary("Get user booking by Id");


        group.MapGet("/{id:int}/details", async (
        int id,
        IBookingService bookingService,
        ClaimsPrincipal user) =>
        {
            var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var details = await bookingService.GetBookingDetailsByIdAsync(id, userId);

            return details is null ? Results.NotFound() : Results.Ok(details);
        })
            .WithName("GetBookingDetails")
            .WithSummary("Get full booking details");
    }
}