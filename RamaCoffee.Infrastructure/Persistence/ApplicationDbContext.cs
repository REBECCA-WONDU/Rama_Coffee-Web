using Microsoft.EntityFrameworkCore;
using RamaCoffee.Domain.Entities;

namespace RamaCoffee.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
}