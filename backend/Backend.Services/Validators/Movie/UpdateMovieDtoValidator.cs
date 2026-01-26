using FluentValidation;
using Backend.Services.DTOs.Movie;

namespace Backend.Services.Validators.Movie;

public class UpdateMovieDtoValidator : AbstractValidator<UpdateMovieDto>
{
    public UpdateMovieDtoValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.TitleORG)
            .NotEmpty().MaximumLength(200);

        RuleFor(x => x.Duration)
            .GreaterThan(0);

        RuleFor(x => x.FinishDate)
            .GreaterThan(x => x.ReleaseDate)
            .WithMessage("Finish Date must be after Release Date.");

        RuleFor(x => x.GenreIds)
            .NotNull();

        RuleFor(x => x.ActorIds)
            .NotNull();
    }
}