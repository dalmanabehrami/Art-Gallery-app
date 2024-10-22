using backend_dotnet7.Core.Dtos.Artwork;

namespace backend_dotnet7.Core.Interfaces
{
    public interface IArtworkService
    {
        Task<ArtworkReadDto> CreateArtworkAsync(ArtworkCreatoDto artworkCreateDto);
        Task<IEnumerable<ArtworkReadDto>> GetAllArtworksAsync();
        Task<ArtworkReadDto> GetArtworkByIdAsync(int id);
        Task<bool> UpdateArtworkAsync(int id, ArtworkCreatoDto artworkCreateDto);
        Task<bool> DeleteArtworkAsync(int id);
    }
}
