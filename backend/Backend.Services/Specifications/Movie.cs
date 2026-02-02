using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications
{
    public class ById : Specification<Movie>
    {
        public ById(int movieId)
        {
            Query
                .Where(m => m.Id == movieId)
                .Include(m => m.Studio)
                .Include(m => m.MovieActors)
                .ThenInclude(ma => ma.Actor)
                .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre);
        }
    }


    public class MovieSearchPagedSpec : Specification<Movie>
    {
        public MovieSearchPagedSpec(MovieFilterDto filter)
        {
            var pageNumber = filter.PageNumber ?? 1;
            var pageSize = filter.PageSize ?? 10;

            Query
                .Include(m => m.Studio)
                .Include(m => m.MovieActors).ThenInclude(ma => ma.Actor)
                .Include(m => m.MovieGenres).ThenInclude(mg => mg.Genre);

            if (!string.IsNullOrEmpty(filter.SearchTerm))
            {
                Query.Where(m =>
                    m.TitleOrg.Contains(filter.SearchTerm) ||
                    m.TitleUkr.Contains(filter.SearchTerm));
            }

            if (filter.GenreId.HasValue)
            {
                Query.Where(m => m.MovieGenres.Any(mg => mg.GenreId == filter.GenreId));
            }

            if (filter.IsComingSoon == true)
            {
                Query.Where(m => m.ReleaseDate > DateTime.UtcNow);
            }

            MovieSorting.ApplySorting(Query, filter);


            Query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);
        }
    }

    public class MovieSearchFilterSpec : Specification<Movie>
    {
        public MovieSearchFilterSpec(MovieFilterDto filter)
        {
            if (!string.IsNullOrEmpty(filter.SearchTerm))
            {
                Query.Where(m =>
                    m.TitleOrg.Contains(filter.SearchTerm) ||
                    m.TitleUkr.Contains(filter.SearchTerm));
            }

            if (filter.GenreId.HasValue)
            {
                Query.Where(m => m.MovieGenres.Any(mg => mg.GenreId == filter.GenreId));
            }

            if (filter.StudioId.HasValue)
            {
                Query.Where(m => m.StudioId == filter.StudioId);
            }


            if (filter.IsComingSoon == true)
            {
                Query.Where(m => m.ReleaseDate > DateTime.UtcNow);
            }

            MovieSorting.ApplySorting(Query, filter);
        }
    }

    internal static class MovieSorting
    {
        public static void ApplySorting(
            ISpecificationBuilder<Movie> query,
            MovieFilterDto filter)
        {
            var desc = filter.SortDirection == SortDirection.Desc;

            switch (filter.SortBy)
            {
                case MovieSortBy.Title:
                    if (desc)
                        query.OrderByDescending(m => m.TitleOrg);
                    else
                        query.OrderBy(m => m.TitleOrg);
                    break;

                case MovieSortBy.ImdbRating:
                    if (desc)
                        query.OrderByDescending(m => m.ImdbRating);
                    else
                        query.OrderBy(m => m.ImdbRating);
                    break;

                case MovieSortBy.Duration:
                    if (desc)
                        query.OrderByDescending(m => m.Duration);
                    else
                        query.OrderBy(m => m.Duration);
                    break;

                case MovieSortBy.ReleaseDate:
                    if (desc)
                        query.OrderByDescending(m => m.ReleaseDate);
                    else
                        query.OrderBy(m => m.ReleaseDate);
                    break;
                case null:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}