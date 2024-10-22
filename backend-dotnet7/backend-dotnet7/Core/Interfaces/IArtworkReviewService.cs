namespace backend_dotnet7.Core.Interfaces
{
    public interface IArtworkReviewService
    {
        Task<bool> CreateArtworkReviewAsync(ArtworkReviewCreateDto artworkReviewCreateDto);
        Task<IEnumerable<ArtworkReviewReadDto>> GetAllArtworkReviewsAsync();
        Task<ArtworkReviewReadDto> GetArtworkReviewByIdAsync(int id);
        Task<bool> UpdateArtworkReviewAsync(int id, ArtworkReviewUpdateDto artworkReviewUpdateDto);
        Task<bool> DeleteArtworkReviewAsync(int id);
    }
}

