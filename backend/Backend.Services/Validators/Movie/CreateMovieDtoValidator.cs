using FluentValidation;
using Backend.Services.DTOs.Movie;

namespace Backend.Services.Validators.Movie
{
    public class CreateMovieDtoValidator : AbstractValidator<CreateMovieDto>
    {
        public CreateMovieDtoValidator()
        {
            RuleFor(x => x.TitleORG)
                .NotEmpty().WithMessage("Original title is required.")
                .MaximumLength(200);

            RuleFor(x => x.TitleUKR)
                .MaximumLength(200);

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MinimumLength(10).WithMessage("Description must be at least 10 characters.");

            RuleFor(x => x.StudioId)
                .GreaterThan(0).WithMessage("Please select a valid Studio.");

            RuleFor(x => x.Duration)
                .InclusiveBetween(1, 600).WithMessage("Duration must be between 1 and 600 minutes.");

            RuleFor(x => x.IMDBRating)
                .InclusiveBetween(0, 10).WithMessage("IMDB Rating must be between 0 and 10.")
                .When(x => x.IMDBRating.HasValue);

            RuleFor(x => x.ReleaseDate)
                .NotEmpty();

            RuleFor(x => x.FinishDate)
                .GreaterThan(x => x.ReleaseDate)
                .WithMessage("Finish Date must be after the Release Date.");

            RuleFor(x => x.ImageURL)
                .Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out _))
                .When(x => !string.IsNullOrEmpty(x.ImageURL))
                .WithMessage("Image URL is not valid.");

            RuleFor(x => x.TrailerURL)
                .Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out _))
                .When(x => !string.IsNullOrEmpty(x.TrailerURL))
                .WithMessage("Trailer URL is not valid.");

            RuleFor(x => x.GenreIds)
                .NotEmpty().WithMessage("At least one Genre is required.");

            RuleFor(x => x.ActorIds)
                .NotEmpty().WithMessage("At least one Actor is required.");
        }
    }
}