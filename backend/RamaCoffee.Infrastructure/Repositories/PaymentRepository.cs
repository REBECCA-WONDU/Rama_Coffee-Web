using Microsoft.EntityFrameworkCore;
using RamaCoffee.Application.Interfaces;
using RamaCoffee.Domain.Entities;
using RamaCoffee.Infrastructure.Persistence;

namespace RamaCoffee.Infrastructure.Repositories;

public class PaymentRepository : IPaymentRepository
{
    private readonly ApplicationDbContext _context;

    public PaymentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
    {
        return await _context.Payments.Include(p => p.Order).ToListAsync();
    }

    public async Task<Payment?> GetPaymentByIdAsync(int id)
    {
        return await _context.Payments.Include(p => p.Order).FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task AddPaymentAsync(Payment payment)
    {
        await _context.Payments.AddAsync(payment);
        await _context.SaveChangesAsync();
    }

    public async Task UpdatePaymentAsync(Payment payment)
    {
        _context.Payments.Update(payment);
        await _context.SaveChangesAsync();
    }
}
