using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtCategoryController : ControllerBase
    {
        private readonly IArtCategoryService _artCategoryService;

        public ArtCategoryController(IArtCategoryService artCategoryService)
        {
            _artCategoryService = artCategoryService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateArtCategory(ArtCategoryCreateDto artCategoryCreateDto)
        {
            var result = await _artCategoryService.CreateArtCategoryAsync(artCategoryCreateDto);
            return result ? Ok("Art category created successfully.") : BadRequest("Failed to create art category.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllArtCategories()
        {
            var categories = await _artCategoryService.GetAllArtCategoriesAsync();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtCategoryById(int id)
        {
            var category = await _artCategoryService.GetArtCategoryByIdAsync(id);
            return category != null ? Ok(category) : NotFound("Art category not found.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArtCategory(int id, ArtCategoryUpdateDto artCategoryUpdateDto)
        {
            var result = await _artCategoryService.UpdateArtCategoryAsync(id, artCategoryUpdateDto);
            return result ? NoContent() : NotFound("Failed to update art category.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtCategory(int id)
        {
            var result = await _artCategoryService.DeleteArtCategoryAsync(id);
            return result ? NoContent() : NotFound("Failed to delete art category.");
        }
    }
}

