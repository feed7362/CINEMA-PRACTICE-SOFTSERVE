using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum DiscountType : short
{
    REGULAR = 0,
    STUDENT = 1,
    MILITARY = 2,
    PROMOCODE = 3
}

public class Discount : IEntity
{
    public int Id { get; set; }

    public DiscountType Type { get; set; }

    public int Percentage { get; set; }

    public bool IsActive { get; set; }
}
