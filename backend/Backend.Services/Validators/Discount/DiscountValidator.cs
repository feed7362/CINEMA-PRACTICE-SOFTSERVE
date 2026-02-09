using Backend.Services.DTOs.Discount;
using FluentValidation;

namespace Backend.Services.Validators.Discount;

public class CreateDiscountDtoValidator : AbstractValidator<CreateDiscountDto>
{
    public CreateDiscountDtoValidator()
    {
        RuleFor(x => x.Code)
            .NotEmpty().WithMessage("Код знижки обов'язковий для " +
            "заповнення.")
            .MinimumLength(3).WithMessage("Код має містити мінімум 3" +
            " символи.")
            .MaximumLength(20).WithMessage("Код не може бути довшим за" +
            " 20 символів.");

        RuleFor(x => x.Percentage)
            .InclusiveBetween(1, 100).WithMessage("Відсоток знижки має" +
            " бути в межах від 1 до 100.");

        RuleFor(x => x.ExpiryDate)
            .NotEmpty().WithMessage("Дата завершення дії обов'язкова.")
            .GreaterThan(DateTime.UtcNow).WithMessage("Дата завершення" +
            " має бути в майбутньому.");
    }
}