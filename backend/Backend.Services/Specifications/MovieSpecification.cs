using Ardalis.Specification;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Movie;

namespace Backend.Services.Specifications
{
    public class MovieById : Specification<Movie>
    {
        public MovieById(int movieId)
        {
            Query
                .Where(m => m.Id == movieId)
                .Include(m => m.Studio)
                .Include(m => m.MovieActors).ThenInclude(ma => ma.Actor)
                .Include(m => m.MovieGenres).ThenInclude(mg => mg.Genre);
        }
    }

    public class MoviesByFilterPagedSpec : Specification<Movie>
    {
        public MoviesByFilterPagedSpec(MovieFilterDto filter)
        {
            var pageNumber = filter.PageNumber.GetValueOrDefault(1);
            if (pageNumber < 1) pageNumber = 1;

            var pageSize = filter.PageSize.GetValueOrDefault(10);
            if (pageSize < 1) pageSize = 10;

            Query
                .Include(m => m.Studio)
                .Include(m => m.MovieActors).ThenInclude(ma => ma.Actor)
                .Include(m => m.MovieGenres).ThenInclude(mg => mg.Genre);

            SpecificationExtensions.ApplyFiltering(Query, filter);

            MovieSorting.ApplySorting(Query, filter);

            Query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);
        }
    }

    public class MoviesByFilterSpec : Specification<Movie>
    {
        public MoviesByFilterSpec(MovieFilterDto filter)
        {
            SpecificationExtensions.ApplyFiltering(Query, filter);
        }
    }

    internal static class SpecificationExtensions 
    {
        public static void ApplyFiltering(
                ISpecificationBuilder<Movie> query, 
                MovieFilterDto filter
            )
        {
            if (!string.IsNullOrEmpty(filter.SearchTerm))
            {
                query.Where(m =>
                    m.TitleOrg.Contains(filter.SearchTerm) ||
                    m.TitleUkr.Contains(filter.SearchTerm));
            }

            if (filter.GenreIds != null && filter.GenreIds.Any())
            {
                query.Where(
                    m => m.MovieGenres.Any(
                            mg => filter.GenreIds.Contains(mg.GenreId)
                        )
                    );
            }
            else if (filter.GenreId.HasValue)
            {
                query.Where(
                    m => m.MovieGenres.Any(
                        mg => mg.GenreId == filter.GenreId)
                    );
            }

            if (filter.StudioId.HasValue)
            {
                query.Where(m => m.StudioId == filter.StudioId);
            }

            if (filter.IsComingSoon == true)
            {
                query.Where(m => m.ReleaseDate > DateTime.UtcNow);
            }

            if (filter.MinRating.HasValue)
            {
                query.Where(x => x.ImdbRating >= filter.MinRating.Value);
            }
        }
    }

    internal static class MovieSorting
    {
        public static void ApplySorting(
            ISpecificationBuilder<Movie> query,
            MovieFilterDto filter)
        {
            var isDesc = filter.SortDirection == 1; 
            var sortBy = filter.SortBy?.ToLower(); 

            switch (sortBy)
            {
                case "title":
                case "titleorg":
                case "titleukr":
                    if (isDesc) query.OrderByDescending(m => m.TitleOrg);
                    else query.OrderBy(m => m.TitleOrg);
                    break;

                case "imdbrating":
                case "rating":
                    if (isDesc) query.OrderByDescending(m => m.ImdbRating);
                    else query.OrderBy(m => m.ImdbRating);
                    break;

                case "duration":
                    if (isDesc) query.OrderByDescending(m => m.Duration);
                    else query.OrderBy(m => m.Duration);
                    break;

                case "releasedate":
                case "date":
                    if (isDesc) query.OrderByDescending(m => m.ReleaseDate);
                    else query.OrderBy(m => m.ReleaseDate);
                    break;

                default:
                    query.OrderByDescending(m => m.Id);
                    break;
            }
        }
    }
}