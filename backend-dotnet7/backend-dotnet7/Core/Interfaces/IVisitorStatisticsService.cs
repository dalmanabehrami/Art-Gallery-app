using backend_dotnet7.Core.Dtos.Visitor;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Interfaces
{
    public interface IVisitorStatisticsService
    {
        Task<bool> CreateVisitorStatisticsAsync(VisitorStatisticsCreateDto visitorStatisticsCreateDto);
        Task<IEnumerable<VisitorStatisticsReadDto>> GetAllVisitorStatisticsAsync();
        Task<VisitorStatisticsReadDto> GetVisitorStatisticsByIdAsync(int id);
        Task<bool> UpdateVisitorStatisticsAsync(int id, VisitorStatisticsUpdateDto visitorStatisticsUpdateDto);
        Task<bool> DeleteVisitorStatisticsAsync(int id);
    }
}

