using backend_dotnet7.Core.Dtos.Visitor;
using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitorController : ControllerBase
    {
        private readonly IVisitorService _visitorService;

        public VisitorController(IVisitorService visitorService)
        {
            _visitorService = visitorService;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterVisitor(VisitorCreateDto visitorCreateDto)
        {
            var result = await _visitorService.RegisterVisitorAsync(visitorCreateDto);
            return result ? Ok("Visitor registered successfully.") : BadRequest("Failed to register visitor.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVisitors()
        {
            var visitors = await _visitorService.GetAllVisitorsAsync();
            return Ok(visitors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVisitorById(int id)
        {
            var visitor = await _visitorService.GetVisitorByIdAsync(id);
            return visitor != null ? Ok(visitor) : NotFound("Visitor not found.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVisitor(int id, VisitorUpdateDto visitorUpdateDto)
        {
            var result = await _visitorService.UpdateVisitorAsync(id, visitorUpdateDto);
            return result ? NoContent() : NotFound("Failed to update visitor.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVisitor(int id)
        {
            var result = await _visitorService.DeleteVisitorAsync(id);
            return result ? NoContent() : NotFound("Failed to delete visitor.");
        }
    }
}

