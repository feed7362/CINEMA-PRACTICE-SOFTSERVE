
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using static Backend.Services.Specifications.Movies;

namespace Backend.Services.Services
{
    public class MovieService
    {
        private readonly IRepository<Movie> _movieRepository;

        public MovieService(IRepository<Movie> movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public Movie GetMovie(string actorName)
        {
            var movie = _movieRepository.GetFirstBySpec(new ByActorName(actorName)); // Using the specification ByActorName from Backend.Services.Specifications.Movies to get the movie by actor name

            if (movie == null)
            {
                throw new Exception("Movie not found");
            }

            return movie;
        }
    }
}
