using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtworkReviewController : ControllerBase
    {
        private readonly IArtworkReviewService _artworkReviewService;

        public ArtworkReviewController(IArtworkReviewService artworkReviewService)
        {
            _artworkReviewService = artworkReviewService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateArtworkReview(ArtworkReviewCreateDto artworkReviewCreateDto)
        {
            var result = await _artworkReviewService.CreateArtworkReviewAsync(artworkReviewCreateDto);
            return result ? Ok("Artwork review created successfully.") : BadRequest("Failed to create artwork review.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllArtworkReviews()
        {
            var reviews = await _artworkReviewService.GetAllArtworkReviewsAsync();
            return Ok(reviews);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtworkReviewById(int id)
        {
            var review = await _artworkReviewService.GetArtworkReviewByIdAsync(id);
            return review != null ? Ok(review) : NotFound("Artwork review not found.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArtworkReview(int id, ArtworkReviewUpdateDto artworkReviewUpdateDto)
        {
            var result = await _artworkReviewService.UpdateArtworkReviewAsync(id, artworkReviewUpdateDto);
            return result ? NoContent() : NotFound("Failed to update artwork review.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtworkReview(int id)
        {
            var result = await _artworkReviewService.DeleteArtworkReviewAsync(id);
            return result ? NoContent() : NotFound("Failed to delete artwork review.");
        }
    }
}

