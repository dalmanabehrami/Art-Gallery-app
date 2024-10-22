using backend_dotnet7.Core.Dtos.Visitor;
using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitorStatisticsController : ControllerBase
    {
        private readonly IVisitorStatisticsService _visitorStatisticsService;

        public VisitorStatisticsController(IVisitorStatisticsService visitorStatisticsService)
        {
            _visitorStatisticsService = visitorStatisticsService;
        }

        // Krijo statistikën e vizitorëve
        [HttpPost]
        public async Task<IActionResult> CreateVisitorStatistics(VisitorStatisticsCreateDto visitorStatisticsCreateDto)
        {
            var result = await _visitorStatisticsService.CreateVisitorStatisticsAsync(visitorStatisticsCreateDto);
            return result ? Ok("Visitor statistics created successfully.") : BadRequest("Failed to create visitor statistics.");
        }

        // Merr të gjitha statistikat e vizitorëve
        [HttpGet]
        public async Task<IActionResult> GetAllVisitorStatistics()
        {
            var visitorStatistics = await _visitorStatisticsService.GetAllVisitorStatisticsAsync();
            return Ok(visitorStatistics);
        }

        // Merr statistikën e vizitorëve sipas ID-së
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVisitorStatisticsById(int id)
        {
            var visitorStatistics = await _visitorStatisticsService.GetVisitorStatisticsByIdAsync(id);
            return visitorStatistics != null ? Ok(visitorStatistics) : NotFound("Visitor statistics not found.");
        }

        // Azhurno statistikën e vizitorëve
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVisitorStatistics(int id, VisitorStatisticsUpdateDto visitorStatisticsUpdateDto)
        {
            var result = await _visitorStatisticsService.UpdateVisitorStatisticsAsync(id, visitorStatisticsUpdateDto);
            return result ? NoContent() : NotFound("Failed to update visitor statistics.");
        }

        // Fshi statistikën e vizitorëve
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVisitorStatistics(int id)
        {
            var result = await _visitorStatisticsService.DeleteVisitorStatisticsAsync(id);
            return result ? NoContent() : NotFound("Failed to delete visitor statistics.");
        }
    }
}

