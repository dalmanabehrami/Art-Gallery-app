using backend_dotnet7.Core.Dtos.Exhibition;
using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExhibitionController : ControllerBase
    {
        private readonly IExhibitionService _exhibitionService;

        public ExhibitionController(IExhibitionService exhibitionService)
        {
            _exhibitionService = exhibitionService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateExhibition(ExhibitionCreateDto exhibitionCreateDto)
        {
            var result = await _exhibitionService.CreateExhibitionAsync(exhibitionCreateDto);
            return result ? Ok("Exhibition created successfully.") : BadRequest("Failed to create exhibition.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllExhibitions()
        {
            var exhibitions = await _exhibitionService.GetAllExhibitionsAsync();
            return Ok(exhibitions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExhibitionById(int id)
        {
            var exhibition = await _exhibitionService.GetExhibitionByIdAsync(id);
            return exhibition != null ? Ok(exhibition) : NotFound("Exhibition not found.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExhibition(int id, ExhibitionUpdateDto exhibitionUpdateDto)
        {
            var result = await _exhibitionService.UpdateExhibitionAsync(id, exhibitionUpdateDto);
            return result ? NoContent() : NotFound("Failed to update exhibition.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExhibition(int id)
        {
            var result = await _exhibitionService.DeleteExhibitionAsync(id);
            return result ? NoContent() : NotFound("Failed to delete exhibition.");
        }
    }
}

