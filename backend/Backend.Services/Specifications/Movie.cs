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

    public class ByActorName : Specification<Movie>
    {
        public ByActorName(string actorName)
        {
            Query
                .Include(m => m.Studio)
                .Include(m => m.MovieActors)
                .ThenInclude(ma => ma.Actor)
                .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre)
                .Where(m => m.MovieActors
                    .Any(ma => ma.Actor.Name.Contains(actorName)));
        }
    }
}