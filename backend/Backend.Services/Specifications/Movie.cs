using Ardalis.Specification;
using Backend.Domain.Entities;

namespace Backend.Services.Specifications
{
    public static class Movies
    {
        public class ById : Specification<Movie>
        {
            public ById(int movieId)
            {
                Query
                    .Where(m => m.Id == movieId)
                    .Include(m => m.MovieActors)
                    .Include(m => m.MovieGenres);
            }
        }
        public class All : Specification<Movie>
        {
            public All()
            {
                Query
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
                    .Include(m => m.MovieActors)
                        .ThenInclude(ma => ma.Actor)
                    .Where(m => m.MovieActors
                        .Any(ma => ma.Actor.ActorName.Contains(actorName)));
            }
        }

    }

}