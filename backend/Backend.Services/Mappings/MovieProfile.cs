using AutoMapper;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Movie;
namespace Backend.Services.Mappings;
public class MovieProfile : Profile
{
    public MovieProfile()
    {
        CreateMap<Movie, ReadMovieDto>()
            .ForMember(dest => dest.StudioName,
                opt => opt.MapFrom(src => src.Studio.Name))
            .ForMember(dest => dest.GenreNames,
                opt => opt.MapFrom(src => src.MovieGenres.Select(mg => mg.Genre.Name)))
            .ForMember(dest => dest.ActorNames,
                opt => opt.MapFrom(src => src.MovieActors.Select(ma => ma.Actor.Name)));

        CreateMap<CreateMovieDto, Movie>()
            .ForMember(dest => dest.MovieGenres, opt => opt.Ignore())
            .ForMember(dest => dest.MovieActors, opt => opt.Ignore());

        CreateMap<UpdateMovieDto, Movie>()
            .ForMember(dest => dest.MovieGenres, opt => opt.Ignore())
            .ForMember(dest => dest.MovieActors, opt => opt.Ignore());
    }
}