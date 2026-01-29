namespace RamaCoffee.Domain.Entities;

public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Roast { get; set; } = string.Empty;

    public decimal Price { get; set; }
    public string Currency { get; set; } = "ETB";

    public int StockQuantity { get; set; }
    public bool IsActive { get; set; } = true;

    public string Image { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
