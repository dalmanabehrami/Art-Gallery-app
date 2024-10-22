namespace backend_dotnet7.Core.Interfaces
{
    public interface IArtCategoryService
    {
        Task<bool> CreateArtCategoryAsync(ArtCategoryCreateDto artCategoryCreateDto);
        Task<IEnumerable<ArtCategoryReadDto>> GetAllArtCategoriesAsync();
        Task<ArtCategoryReadDto> GetArtCategoryByIdAsync(int id);
        Task<bool> UpdateArtCategoryAsync(int id, ArtCategoryUpdateDto artCategoryUpdateDto);
        Task<bool> DeleteArtCategoryAsync(int id);
    }
}

