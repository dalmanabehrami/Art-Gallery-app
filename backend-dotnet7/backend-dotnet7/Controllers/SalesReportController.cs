using backend_dotnet7.Core.Dtos.SalesReport;
using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesReportController : ControllerBase
    {
        private readonly ISalesReportService _salesReportService;

        public SalesReportController(ISalesReportService salesReportService)
        {
            _salesReportService = salesReportService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSalesReport(SalesReportCreateDto salesReportCreateDto)
        {
            var result = await _salesReportService.CreateSalesReportAsync(salesReportCreateDto);
            return result ? Ok("Sales report created successfully.") : BadRequest("Failed to create sales report.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSalesReports()
        {
            var salesReports = await _salesReportService.GetAllSalesReportsAsync();
            return Ok(salesReports);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSalesReportById(int id)
        {
            var salesReport = await _salesReportService.GetSalesReportByIdAsync(id);
            return salesReport != null ? Ok(salesReport) : NotFound("Sales report not found.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSalesReport(int id, SalesReportUpdateDto salesReportUpdateDto)
        {
            var result = await _salesReportService.UpdateSalesReportAsync(id, salesReportUpdateDto);
            return result ? NoContent() : NotFound("Failed to update sales report.");
        }
    }
}
