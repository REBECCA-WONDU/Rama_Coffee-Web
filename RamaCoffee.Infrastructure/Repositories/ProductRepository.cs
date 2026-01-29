using Microsoft.EntityFrameworkCore;
using RamaCoffee.Application.Interfaces;
using RamaCoffee.Domain.Entities;
using RamaCoffee.Infrastructure.Persistence;

namespace RamaCoffee.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _context;

    public ProductRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _context.Products.ToListAsync();
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _context.Products.FindAsync(id);
    }
}