using backend_dotnet7.Core.Dtos.Customer;
using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterCustomer(CustomerCreateDto customerCreateDto)
        {
            var result = await _customerService.RegisterCustomerAsync(customerCreateDto);
            return result ? Ok("Customer registered successfully") : BadRequest("Failed to register customer");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            var customer = await _customerService.GetCustomerByIdAsync(id);
            return customer != null ? Ok(customer) : NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await _customerService.GetAllCustomersAsync();
            return Ok(customers);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, CustomerUpdateDto customerUpdateDto)
        {
            var result = await _customerService.UpdateCustomerAsync(id, customerUpdateDto);
            return result ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var result = await _customerService.DeleteCustomerAsync(id);
            return result ? NoContent() : NotFound();
        }
    }
}

