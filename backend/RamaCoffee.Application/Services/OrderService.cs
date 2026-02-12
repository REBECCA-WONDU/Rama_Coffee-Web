using RamaCoffee.Application.DTOs;
using RamaCoffee.Application.Interfaces;
using RamaCoffee.Domain.Entities;

namespace RamaCoffee.Application.Services;

public class OrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;

    public OrderService(IOrderRepository orderRepository, IProductRepository productRepository)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
    {
        var orders = await _orderRepository.GetAllOrdersAsync();
        return orders.Select(o => MapToDto(o));
    }

    public async Task<OrderDto?> GetOrderByIdAsync(int id)
    {
        var order = await _orderRepository.GetOrderByIdAsync(id);
        return order != null ? MapToDto(order) : null;
    }

    public async Task<OrderDto> CreateOrderAsync(CreateOrderDto createOrderDto)
    {
        var order = new Order
        {
            CustomerId = createOrderDto.CustomerId,
            GuestName = createOrderDto.GuestName,
            GuestPhone = createOrderDto.GuestPhone,
            GuestAddress = createOrderDto.GuestAddress,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        decimal totalAmount = 0;

        foreach (var itemDto in createOrderDto.Items)
        {
            var product = await _productRepository.GetByIdAsync(itemDto.ProductId);
            if (product == null) throw new Exception($"Product with ID {itemDto.ProductId} not found.");

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Quantity = itemDto.Quantity,
                UnitPrice = product.Price
            };

            order.Items.Add(orderItem);
            totalAmount += orderItem.Quantity * orderItem.UnitPrice;
        }

        order.TotalAmount = totalAmount;

        await _orderRepository.AddOrderAsync(order);

        return MapToDto(order);
    }

    public async Task UpdateOrderStatusAsync(int orderId, string status)
    {
        var order = await _orderRepository.GetOrderByIdAsync(orderId);
        if (order == null) throw new Exception("Order not found.");

        order.Status = status;
        await _orderRepository.UpdateOrderAsync(order);
    }

    private OrderDto MapToDto(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            CustomerId = order.CustomerId,
            GuestName = order.GuestName,
            GuestPhone = order.GuestPhone,
            GuestAddress = order.GuestAddress,
            TotalAmount = order.TotalAmount,
            Status = order.Status,
            CreatedAt = order.CreatedAt,
            Items = order.Items.Select(i => new OrderItemDto
            {
                ProductId = i.ProductId,
                ProductName = i.Product?.Name ?? "Unknown",
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice
            }).ToList()
        };
    }
}
