using FluentValidation;

namespace Backend.API.Extensions;

public class ValidationFilter<T> : IEndpointFilter
{
    private readonly IValidator<T>? _validator;

    public ValidationFilter(IValidator<T>? validator = null)
    {
        _validator = validator;
    }

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        if (_validator is not null)
        {
            var entity = context.Arguments.OfType<T>().FirstOrDefault();

            if (entity is null)
            {
                return Results.BadRequest(new { error = $"The request body for {typeof(T).Name} is required." });
            }

            var validationResult = await _validator.ValidateAsync(entity);
            if (!validationResult.IsValid)
            {
                return Results.ValidationProblem(validationResult.ToDictionary());
            }
        }

        return await next(context);
    }
}