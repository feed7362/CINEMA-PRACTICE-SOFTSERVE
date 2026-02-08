using AutoMapper;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Movie;

namespace Backend.Services.Mappings;

public class RecommendationProfile : Profile
{
    public RecommendationProfile()
    {
        CreateMap<Movie, MovieRecommendationDto>()
            .ForMember(dest => dest.Genres, opt => opt.MapFrom(src => src.MovieGenres.Select(mg => mg.Genre.Name)))
            .ForMember(dest => dest.Actors, opt => opt.MapFrom(src => src.MovieActors.Select(ma => ma.Actor.Name)));
    }
}