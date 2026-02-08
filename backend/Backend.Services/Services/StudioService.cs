using AutoMapper;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Backend.Services.DTOs;
using Backend.Services.DTOs.Studio;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Backend.Services.Specifications;

namespace Backend.Services.Services;

public class StudioService(
    IRepository<Studio> repository,
    IMapper mapper
) : IStudioService
{

    public async Task<PagedResponse<ReadStudioDto>> GetAllStudiosAsync(
            StudioFilterDto filter
        )
    {
        var filterSpec = new StudiosByFilterSpec(filter.SearchTerm);
        var totalCount = await repository.CountAsync(filterSpec);

        var pagedSpec = new StudiosByFilterPagedSpec(
            filter.SearchTerm,
            filter.PageNumber,
            filter.PageSize
        );

        var studios = await repository.GetListBySpecAsync(pagedSpec);

        var items = mapper.Map<List<ReadStudioDto>>(studios);

        return new PagedResponse<ReadStudioDto>(
            items,
            totalCount,
            filter.PageNumber,
            filter.PageSize
        );
    }
}