using AutoMapper;
using Backend.Domain.Entities;
using Backend.Services.DTOs.Genre;
using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.Services.Mappings;

public class GenreProfile : Profile
{
    public GenreProfile()
    {
        CreateMap<Genre, ReadGenreDto>();
    }
}