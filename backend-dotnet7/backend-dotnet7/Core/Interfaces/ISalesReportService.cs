using backend_dotnet7.Core.Dtos.SalesReport;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Interfaces
{
    public interface ISalesReportService
    {
        Task<bool> CreateSalesReportAsync(SalesReportCreateDto salesReportCreateDto);
        Task<IEnumerable<SalesReportReadDto>> GetAllSalesReportsAsync();
        Task<SalesReportReadDto> GetSalesReportByIdAsync(int id);
        Task<bool> UpdateSalesReportAsync(int id, SalesReportUpdateDto salesReportUpdateDto);
    }
}

