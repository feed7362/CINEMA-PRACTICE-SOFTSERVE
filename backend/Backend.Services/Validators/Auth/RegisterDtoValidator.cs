using FluentValidation;
using Backend.Services.DTOs.Auth;

namespace Backend.Services.Validators.Auth;

public class RegisterDtoValidator : AbstractValidator<RegisterDto>
{
    public RegisterDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email є обов'язковим")
            .EmailAddress().WithMessage("Некоректний формат Email");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Пароль є обов'язковим")
            .MinimumLength(6).WithMessage("Пароль має бути не менше 6 " +
            "символів")

            .Matches(@"[A-Z]").WithMessage("Пароль має містити хоча б " +
            "одну велику літеру")

            .Matches(@"[a-z]").WithMessage("Пароль має містити хоча б " +
            "одну малу літеру")

            .Matches(@"[0-9]").WithMessage("Пароль має містити хоча б " +
            "одну цифру");

        RuleFor(x => x.ConfirmPassword)
            .Equal(x => x.Password).WithMessage("Паролі не збігаються");
    }
}