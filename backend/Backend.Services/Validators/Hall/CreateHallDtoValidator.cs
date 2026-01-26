using FluentValidation;
using Backend.Services.DTOs.Hall;

namespace Backend.Services.Validators.Hall;

public class CreateHallDtoValidator : AbstractValidator<CreateHallDto>
{
    public CreateHallDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Назва залу є обов'язковою")
            .MaximumLength(50).WithMessage("Назва не може бути довшою за 50 символів");

        RuleFor(x => x.Format)
            .InclusiveBetween((short)0, (short)5).WithMessage("Некоректний формат залу");

        RuleFor(x => x.SeatMap)
            .NotEmpty().WithMessage("Карта місць не може бути порожньою")
            .Must(x => x.Count > 0).WithMessage("Зал повинен мати хоча б один ряд");
    }
}