using backend_dotnet7.Core.Dtos.Discount;
using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountService _discountService;

        public DiscountController(IDiscountService discountService)
        {
            _discountService = discountService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateDiscount(DiscountCreateDto discountCreateDto)
        {
            var result = await _discountService.CreateDiscountAsync(discountCreateDto);
            return result ? Ok("Discount created successfully.") : BadRequest("Failed to create discount.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDiscounts()
        {
            var discounts = await _discountService.GetAllDiscountsAsync();
            return Ok(discounts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDiscountById(int id)
        {
            var discount = await _discountService.GetDiscountByIdAsync(id);
            return discount != null ? Ok(discount) : NotFound("Discount not found.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDiscount(int id, DiscountUpdateDto discountUpdateDto)
        {
            var result = await _discountService.UpdateDiscountAsync(id, discountUpdateDto);
            return result ? NoContent() : NotFound("Failed to update discount.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiscount(int id)
        {
            var result = await _discountService.DeleteDiscountAsync(id);
            return result ? NoContent() : NotFound("Failed to delete discount.");
        }
    }
}


