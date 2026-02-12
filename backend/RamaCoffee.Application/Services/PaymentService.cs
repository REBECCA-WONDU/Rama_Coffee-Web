using RamaCoffee.Application.Interfaces;
using RamaCoffee.Domain.Entities;

namespace RamaCoffee.Application.Services;

public class PaymentService
{
    private readonly IPaymentRepository _repository;

    public PaymentService(IPaymentRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
    {
        return await _repository.GetAllPaymentsAsync();
    }

    public async Task<Payment?> GetPaymentByIdAsync(int id)
    {
        return await _repository.GetPaymentByIdAsync(id);
    }

    public async Task ProcessPaymentAsync(Payment payment)
    {
        // Add payment processing logic here (e.g. Telebirr API integration)
        payment.PaidAt = DateTime.UtcNow;
        payment.Status = "Completed";
        await _repository.AddPaymentAsync(payment);
    }
}
