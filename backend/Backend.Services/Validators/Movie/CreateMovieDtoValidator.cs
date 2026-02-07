using FluentValidation;
using Backend.Services.DTOs.Movie;
namespace Backend.Services.Validators.Movie
{
    public class CreateMovieDtoValidator : AbstractValidator<CreateMovieDto>
    {
        public CreateMovieDtoValidator()
        {
            RuleFor(x => x.TitleOrg)
            .NotEmpty().WithMessage("Оригінальна назва є обов'язковою.")
            .MaximumLength(200);

            RuleFor(x => x.TitleUkr)
                .MaximumLength(200);

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Опис є обов'язковим.")
                .MinimumLength(10).WithMessage("Опис має містити " +
                "принаймні 10 символів.");

            RuleFor(x => x.StudioId)
                .GreaterThan(0).WithMessage("Будь ласка, виберіть " +
                "коректну студію.");

            RuleFor(x => x.Duration)
                .InclusiveBetween(1, 600).WithMessage("Тривалість має " +
                "бути від 1 до 600 хвилин.");

            RuleFor(x => x.ImdbRating)
                .InclusiveBetween(0, 10).WithMessage("Рейтинг IMDB має " +
                "бути від 0 до 10.")
                .When(x => x.ImdbRating.HasValue);

            RuleFor(x => x.ReleaseDate)
                .NotEmpty();

            RuleFor(x => x.FinishDate)
                .GreaterThan(x => x.ReleaseDate)
                .WithMessage("Дата завершення має бути пізнішою за " +
                "дату виходу.");

            RuleFor(x => x.ImageUrl)
                .Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out _))
                .When(x => !string.IsNullOrEmpty(x.ImageUrl))
                .WithMessage("Посилання на зображення є некоректним.");

            RuleFor(x => x.TrailerUrl)
                .Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out _))
                .When(x => !string.IsNullOrEmpty(x.TrailerUrl))
                .WithMessage("Посилання на трейлер є некоректним.");

            RuleFor(x => x.GenreIds)
                .NotEmpty().WithMessage("Необхідно вказати хоча б один" +
                " жанр.");

            RuleFor(x => x.ActorIds)
                .NotEmpty().WithMessage("Необхідно вказати хоча б " +
                "одного актора.");
        }
    }
}