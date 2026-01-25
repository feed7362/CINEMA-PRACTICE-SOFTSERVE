using Ardalis.Specification;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Movie;

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

    public class All : Specification<Movie>
    {
        public All()
        {
            Query
                .Include(m => m.Studio)
                .Include(m => m.MovieActors)
                .ThenInclude(ma => ma.Actor)
                .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre);
        }
    }

    public class Search : Specification<Movie>
    {
        public Search(MovieFilterDto filter)
        {
            Query
                .Include(m => m.Studio)
                .Include(m => m.MovieActors)
                .ThenInclude(ma => ma.Actor)
                .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre);

            if (!string.IsNullOrEmpty(filter.SearchTerm))
            {
                Query.Where(m =>
                    m.TitleORG.Contains(filter.SearchTerm) ||
                    m.TitleUKR.Contains(filter.SearchTerm));
            }

            if (filter.GenreId.HasValue)
            {
                Query.Where(m => m.MovieGenres.Any(mg => mg.GenreId == filter.GenreId));
            }

            if (filter.IsComingSoon.HasValue && filter.IsComingSoon.Value)
            {
                Query.Where(m => m.ReleaseDate > DateTime.UtcNow);
            }

            Query.OrderByDescending(m => m.ReleaseDate);
        }
    }
}