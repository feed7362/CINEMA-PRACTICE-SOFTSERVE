namespace Backend.Domain.Shared;

public class PagedResult<T>(List<T> items, int count, int pageNumber, int pageSize)
{
    public List<T> Items { get; set; } = items;
    public int TotalItems { get; set; } = count;
    public int PageNumber { get; set; } = pageNumber;
    public int PageSize { get; set; } = pageSize;
    private int TotalPages => (int)Math.Ceiling(TotalItems / (double)PageSize);
    public bool HasNextPage => PageNumber < TotalPages;
    public bool HasPreviousPage => PageNumber > 1;
}