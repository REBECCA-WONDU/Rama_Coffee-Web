using RamaCoffee.Application.DTOs;
using RamaCoffee.Application.Interfaces;
using RamaCoffee.Domain.Entities;

namespace RamaCoffee.Application.Services;

public class CustomerService
{
    private readonly ICustomerRepository _repository;

    public CustomerService(ICustomerRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<CustomerDto>> GetAllCustomersAsync()
    {
        var customers = await _repository.GetAllCustomersAsync();
        return customers.Select(c => MapToDto(c));
    }

    public async Task<CustomerDto?> GetCustomerByIdAsync(int id)
    {
        var customer = await _repository.GetCustomerByIdAsync(id);
        return customer != null ? MapToDto(customer) : null;
    }

    public async Task<CustomerDto> CreateCustomerAsync(CreateCustomerDto dto)
    {
        var customer = new Customer
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = "hashed_password_placeholder", // In a real app, hash the password
            PhoneNumber = dto.PhoneNumber,
            CreatedAt = DateTime.UtcNow
        };

        await _repository.AddCustomerAsync(customer);
        return MapToDto(customer);
    }

    private CustomerDto MapToDto(Customer customer)
    {
        return new CustomerDto
        {
            Id = customer.Id,
            FullName = customer.FullName,
            Email = customer.Email,
            PhoneNumber = customer.PhoneNumber,
            CreatedAt = customer.CreatedAt
        };
    }
}
