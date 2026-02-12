using System;
using System.Collections.Generic;

namespace RamaCoffee.Application.DTOs;

public class OrderDto
{
    public int Id { get; set; }
    public int? CustomerId { get; set; }
    public string? GuestName { get; set; }
    public string? GuestPhone { get; set; }
    public string? GuestAddress { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
}

public class OrderItemDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}

public class CreateOrderDto
{
    public int? CustomerId { get; set; }
    public string? GuestName { get; set; }
    public string? GuestPhone { get; set; }
    public string? GuestAddress { get; set; }
    public List<CreateOrderItemDto> Items { get; set; } = new();
}

public class CreateOrderItemDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}
