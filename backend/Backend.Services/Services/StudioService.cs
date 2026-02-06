using Backend.Data;
using Backend.Services.DTOs.Studio;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Services;

public class StudioService : IStudioService
{
    private readonly ApplicationContext _context;

    public StudioService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ReadStudioDto>> GetAllStudiosAsync(StudioFilterDto filter)
    {
        var query = _context.Studios.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
        {
            query = query.Where(s => s.Name.Contains(filter.SearchTerm));
        }

        var studios = await query
            .Skip((filter.PageNumber - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .Select(s => new ReadStudioDto
            {
                Id = s.Id,
                Name = s.Name
            })
            .ToListAsync();

        return studios;
    }
}