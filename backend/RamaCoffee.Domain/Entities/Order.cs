using System;

namespace RamaCoffee.Domain.Entities;

public class Order
{

public int Id{get; set;}
public int? CustomerId{get; set;}
// Guest checkout fields

public string? GuestName{get; set;}
public string?GuestPhone {get ; set;}
public string? GuestAddress{get; set;}

public decimal TotalAmount {get; set;}
public string Status{ get; set;} = "Pending";
public DateTime CreatedAt{get; set;}= DateTime.UtcNow;
public ICollection<OrderItem> Items {get; set;}=new List<OrderItem>();
}
