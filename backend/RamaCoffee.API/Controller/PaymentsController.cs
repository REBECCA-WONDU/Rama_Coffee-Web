using Microsoft.AspNetCore.Mvc;
using RamaCoffee.Application.Services;
using RamaCoffee.Domain.Entities;

namespace RamaCoffee.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly PaymentService _paymentService;

    public PaymentsController(PaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
    {
        return Ok(await _paymentService.GetAllPaymentsAsync());
    }

    [HttpPost]
    public async Task<ActionResult> CreatePayment(Payment payment)
    {
        await _paymentService.ProcessPaymentAsync(payment);
        return Ok(payment);
    }
}
