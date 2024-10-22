using backend_dotnet7.Core.Dtos.Artwork;
using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtworkController : ControllerBase
    {
        private readonly IArtworkService _artworkService;

        public ArtworkController(IArtworkService artworkService)
        {
            _artworkService = artworkService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateArtwork([FromBody] ArtworkCreatoDto artworkCreateDto)
        {
            var createdArtwork = await _artworkService.CreateArtworkAsync(artworkCreateDto);
            return CreatedAtAction(nameof(GetArtworkById), new { id = createdArtwork.Id }, createdArtwork);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllArtworks()
        {
            var artworks = await _artworkService.GetAllArtworksAsync();
            return Ok(artworks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtworkById(int id)
        {
            var artwork = await _artworkService.GetArtworkByIdAsync(id);
            if (artwork == null) return NotFound();
            return Ok(artwork);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArtwork(int id, [FromBody] ArtworkCreatoDto artworkUpdateDto)
        {
            var result = await _artworkService.UpdateArtworkAsync(id, artworkUpdateDto);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtwork(int id)
        {
            var result = await _artworkService.DeleteArtworkAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
