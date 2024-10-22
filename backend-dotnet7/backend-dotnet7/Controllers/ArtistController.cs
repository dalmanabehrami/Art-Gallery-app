using backend_dotnet7.Core.Dtos.Artist;
using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly IArtistService _artistService;

        public ArtistController(IArtistService artistService)
        {
            _artistService = artistService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateArtist(ArtistCreateDto artistCreateDto)
        {
            var result = await _artistService.CreateArtistAsync(artistCreateDto);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllArtists()
        {
            var result = await _artistService.GetAllArtistsAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtistById(int id)
        {
            var result = await _artistService.GetArtistByIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArtist(int id, ArtistUpdateDto artistUpdateDto)
        {
            var success = await _artistService.UpdateArtistAsync(id, artistUpdateDto);
            return success ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtist(int id)
        {
            var success = await _artistService.DeleteArtistAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
}

