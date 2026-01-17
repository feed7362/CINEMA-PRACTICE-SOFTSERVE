namespace Backend.Domain.Entities;

public class Discount
{
    public long Id { get; set; }

    public string DiscountName { get; set; } = null!;
    public int Percentage { get; set; }

    public bool IsActive { get; set; }
}
