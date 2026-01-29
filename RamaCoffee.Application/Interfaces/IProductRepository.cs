using RamaCoffee.Domain.Entities;

namespace RamaCoffee.Application.Interfaces;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
}