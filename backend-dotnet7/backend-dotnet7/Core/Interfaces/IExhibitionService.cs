using backend_dotnet7.Core.Dtos.Exhibition;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Interfaces
{
    public interface IExhibitionService
    {
        Task<bool> CreateExhibitionAsync(ExhibitionCreateDto exhibitionCreateDto);
        Task<IEnumerable<ExhibitionReadDto>> GetAllExhibitionsAsync();
        Task<ExhibitionReadDto> GetExhibitionByIdAsync(int id);
        Task<bool> UpdateExhibitionAsync(int id, ExhibitionUpdateDto exhibitionUpdateDto);
        Task<bool> DeleteExhibitionAsync(int id);
    }
}

