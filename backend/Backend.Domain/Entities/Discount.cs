using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Discount : IEntity
{
    public long Id { get; set; }

    public string DiscountName { get; set; } = null!;
    public int Percentage { get; set; }

    public bool IsActive { get; set; }
}
