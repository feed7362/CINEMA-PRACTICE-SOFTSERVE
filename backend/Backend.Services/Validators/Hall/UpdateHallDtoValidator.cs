using FluentValidation;
using Backend.Services.DTOs.Hall;

namespace Backend.Services.Validators.Hall;

public class UpdateHallDtoValidator : AbstractValidator<UpdateHallDto>
{
    public UpdateHallDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Назва залу є обов'язковою")
            .MaximumLength(50).WithMessage("Назва не може бути " +
            "довшою за 50 символів");

        RuleFor(x => x.Format)
            .InclusiveBetween(0, 5).WithMessage("Некоректний формат залу");
    }
}