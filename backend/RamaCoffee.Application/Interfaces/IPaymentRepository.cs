using RamaCoffee.Domain.Entities;

namespace RamaCoffee.Application.Interfaces;

public interface IPaymentRepository
{
    Task<IEnumerable<Payment>> GetAllPaymentsAsync();
    Task<Payment?> GetPaymentByIdAsync(int id);
    Task AddPaymentAsync(Payment payment);
    Task UpdatePaymentAsync(Payment payment);
}
