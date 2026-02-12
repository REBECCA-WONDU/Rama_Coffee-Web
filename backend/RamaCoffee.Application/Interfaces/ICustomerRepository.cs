using RamaCoffee.Domain.Entities;

namespace RamaCoffee.Application.Interfaces;

public interface ICustomerRepository
{
    Task<IEnumerable<Customer>> GetAllCustomersAsync();
    Task<Customer?> GetCustomerByIdAsync(int id);
    Task<Customer?> GetCustomerByEmailAsync(string email);
    Task AddCustomerAsync(Customer customer);
    Task UpdateCustomerAsync(Customer customer);
    Task DeleteCustomerAsync(int id);
}
