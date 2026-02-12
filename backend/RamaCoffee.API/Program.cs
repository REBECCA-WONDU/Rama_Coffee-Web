using Microsoft.EntityFrameworkCore;
using RamaCoffee.Application.Interfaces;
using RamaCoffee.Application.Services;
using RamaCoffee.Infrastructure.Persistence;
using RamaCoffee.Infrastructure.Repositories;
using RamaCoffee.Domain.Entities;
using RamaCoffee.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 1. Add Database (using SQL Server)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Register Repositories and Services
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();

builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<PaymentService>();

// 3. Add CORS to allow React Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy.WithOrigins("http://localhost:3000") // Adjust origin if needed
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Global Error Handling Middleware
app.UseMiddleware<ErrorHandlingMiddleware>();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

// Redirect root URL to Swagger UI
app.MapGet("/", () => Results.Redirect("/swagger/index.html"));

// app.UseHttpsRedirection(); // Disabled for local development
app.UseCors("AllowReact");
app.UseAuthorization();
app.MapControllers();

// Seed Data logic
try
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        if (!context.Products.Any())
        {
            context.Products.AddRange(
                new Product { 
                    Name = "Ethiopian Yirgacheffe", 
                    Roast = "Light Roast", 
                    Price = 1200, 
                    Currency = "ETB",
                    Notes = "Floral with hints of citrus and a tea-like finish.", 
                    Description = "Yirgacheffe is a small region in Ethiopia known for producing some of the most distinctive coffees in the world. This light roast highlights the delicate floral aromas and bright citrus acidity that define the region's profile.",
                    Image = "https://plus.unsplash.com/premium_photo-1666976510011-28202995a11b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXRoaW9waWFuJTIwY29mZmVlfGVufDB8fDB8fDB"
                },
                new Product { 
                    Name = "Sidama Guji", 
                    Roast = "Medium Roast", 
                    Price = 1150, 
                    Currency = "ETB",
                    Notes = "Notes of berries and wine-like acidity.", 
                    Description = "Guji coffee comes from the southern highlands of Ethiopia. This medium roast offers a perfect balance of deep berry sweetness and a sophisticated wine-like acidity, making it a favorite for both filter coffee and espresso.",
                    Image = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
                },
                new Product { 
                    Name = "Harrar Bold", 
                    Roast = "Dark Roast", 
                    Price = 1350, 
                    Currency = "ETB",
                    Notes = "Chocolatey, spicy, and intense body.", 
                    Description = "Harrar is one of the oldest coffee-growing regions. Our dark roast brings out the intense chocolatey body and unique blueberry undertones that have made Harrar beans legendary among coffee connoisseurs.",
                    Image = "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=800&auto=format&fit=crop"
                },
                new Product { 
                    Name = "Kaffa Origin", 
                    Roast = "Medium-Dark Roast", 
                    Price = 1280, 
                    Currency = "ETB",
                    Notes = "Wild forest coffee with notes of dark chocolate and deep spice.", 
                    Description = "Kaffa is considered the birthplace of Arabica coffee. These beans are harvested from high-altitude wild forests, offering a complex profile with deep spicy notes and a rich, dark chocolate finish.",
                    Image = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
                }
            );
            context.SaveChanges();
        }
    }
}
catch (Exception ex)
{
    app.Logger.LogError(ex, "An error occurred during database seeding.");
}

app.Run();