using Backend.Domain.Entities;
using Ardalis.Specification;

namespace Backend.Services.Specifications;

public class UserMoviePageViewsSpec : Specification<MoviePageView>
{
    public UserMoviePageViewsSpec(int userId)
    {
        Query
            .Where(v => v.UserId == userId)
            .Include(v => v.Movie)
                .ThenInclude(m => m.MovieGenres)
            .Include(v => v.Movie)
                .ThenInclude(m => m.MovieActors);
    }
}

public class MovieWithActorsAndGenresSpec : Specification<Movie>
{
    public MovieWithActorsAndGenresSpec()
    {
        Query
            .Include(m => m.MovieActors)
                .ThenInclude(ma => ma.Actor)
            .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre);
    }
}