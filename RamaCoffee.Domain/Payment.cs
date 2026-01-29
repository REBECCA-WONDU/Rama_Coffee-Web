using System;

namespace RamaCoffee.Domain;

public class Payment
{
 
 public int Id{get ; set;}

 public int OrderId{get; set;}
 public Order Order {get; set;}=null!;

 public decimal Amount {get; set;}
 public string PaymentMethod{get; set;}="Telebirr";
 public string Status{get; set;}="Pending";

 public string? TransactionRef{get; set;}
 public DateTime? PaidAt{get; set;}


}
