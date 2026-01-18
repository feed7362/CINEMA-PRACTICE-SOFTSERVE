using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum DiscountType : short
{
    STUDENT = 0,
    MILITARY = 1,
    PROMOCODE = 2
}

public class Discount : IEntity
{
    public int Id { get; set; }

    public DiscountType Type { get; set; }

    public int Percentage { get; set; }

    public bool IsActive { get; set; }
}
