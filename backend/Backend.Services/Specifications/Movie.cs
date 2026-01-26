using Ardalis.Specification;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Movie;

namespace Backend.Services.Specifications;

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
                m.TitleORG.Contains(filter.SearchTerm) ||
                m.TitleUKR.Contains(filter.SearchTerm));
        }

        if (filter.GenreId.HasValue)
        {
            Query.Where(m => m.MovieGenres.Any(mg => mg.GenreId == filter.GenreId));
        }

        if (filter.IsComingSoon == true)
        {
            Query.Where(m => m.ReleaseDate > DateTime.UtcNow);
        }

        Query
            .OrderByDescending(m => m.ReleaseDate)
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
                m.TitleORG.Contains(filter.SearchTerm) ||
                m.TitleUKR.Contains(filter.SearchTerm));
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
    }
}