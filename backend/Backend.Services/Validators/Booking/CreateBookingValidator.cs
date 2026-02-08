using Backend.Services.DTOs.Booking;
using FluentValidation;

namespace Backend.Services.Validators.Booking;

public class CreateBookingValidator : AbstractValidator<CreateBookingDto>
{
    public CreateBookingValidator()
    {
        RuleFor(x => x.SessionId)
            .GreaterThan(0)
            .WithMessage("Потрібно вказати дійсний ID сеансу.");

        RuleFor(x => x.SeatIds)
            .NotEmpty()
            .WithMessage("Потрібно вибрати хоча б одне місце.")
            .Must(list => list != null && list.Count > 0 && list.All(id => id > 0))
            .WithMessage("Усі ID місць повинні бути дійсними додатними числами.");

        RuleFor(x => x.SeatIds)
            .Must(list => list != null && list.Count <= 10)
            .WithMessage("Неможливо забронювати більше 10 місць за одну транзакцію.");

        RuleFor(x => x.Promocode)
            .MaximumLength(50)
                .WithMessage("Промокод занадто довгий (макс. 50 символів).")
            .Matches("^[a-zA-Z0-9]*$")
                .WithMessage("Промокод може містити лише літери та цифри.")
            .When(x => !string.IsNullOrEmpty(x.Promocode));
    }
}