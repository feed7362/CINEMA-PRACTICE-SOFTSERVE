using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum DiscountType : short
{
    STUDENT = 0,
    MILITARY = 1,
    BIRTHDAY = 2,
    CHILDREN = 3
}

public class Discount : IEntity
{
    public int Id { get; set; }

    public DiscountType Type { get; set; }

    public int Percentage { get; set; }

    public bool IsActive { get; set; }

    public string? Code { get; set; }
    public DateTime? ExpiryDate { get; set; }
}
