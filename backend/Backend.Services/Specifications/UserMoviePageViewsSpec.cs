using Backend.Domain.Entities;
using Ardalis.Specification;

namespace Backend.Services.Specifications
{
    public class RecentUserMovieViewsSpec : Specification<MoviePageView>
    {
        public RecentUserMovieViewsSpec(int userId)
        {
            Query
                .Where(v => v.UserId == userId)
                .Include(v => v.Movie)
                    .ThenInclude(m => m.MovieGenres)
                .Include(v => v.Movie)
                    .ThenInclude(m => m.MovieActors)
                .OrderByDescending(v => v.LastViewedAt);
        }
    }

    public class RecommendedMoviesCandidateSpec : Specification<Movie>
    {
        public RecommendedMoviesCandidateSpec(
                IEnumerable<int> genreIds, 
                IEnumerable<int> actorIds, 
                IEnumerable<int> excludedMovieIds
            )
        {
            Query
                .Include(m => m.MovieActors).ThenInclude(ma => ma.Actor)
                .Include(m => m.MovieGenres).ThenInclude(mg => mg.Genre)
                .Where(
                    m => (m.MovieGenres.Any(g => genreIds.Contains(g.GenreId)) 
                        || m.MovieActors.Any(a => actorIds.Contains(a.ActorId)))
                        && !excludedMovieIds.Contains(m.Id))
                .AsNoTracking(); 
        }
    }
}