using backend_dotnet7.Core.Dtos.Artist;
using backend_dotnet7.Core.Entities;

namespace backend_dotnet7.Core.Interfaces
{
    public interface IArtistService
    {
        Task<ArtistReadDto> CreateArtistAsync(ArtistCreateDto artistCreateDto);
        Task<IEnumerable<ArtistReadDto>> GetAllArtistsAsync();
        Task<ArtistReadDto> GetArtistByIdAsync(int id);
        Task<bool> UpdateArtistAsync(int id, ArtistUpdateDto artistUpdateDto);
        Task<bool> DeleteArtistAsync(int id);
    }
}
