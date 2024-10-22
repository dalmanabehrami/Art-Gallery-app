using backend_dotnet7.Core.Dtos.Visitor;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Interfaces
{
    public interface IVisitorService
    {
        Task<bool> RegisterVisitorAsync(VisitorCreateDto visitorCreateDto);
        Task<IEnumerable<VisitorReadDto>> GetAllVisitorsAsync();
        Task<VisitorReadDto> GetVisitorByIdAsync(int id);
        Task<bool> UpdateVisitorAsync(int id, VisitorUpdateDto visitorUpdateDto);
        Task<bool> DeleteVisitorAsync(int id);
    }
}

