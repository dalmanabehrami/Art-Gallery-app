using backend_dotnet7.Core.Dtos.SalesReport;
using backend_dotnet7.Core.Entities;
using backend_dotnet7.Core.Interfaces;
using backend_dotnet7.Core.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Services
{
    public class SalesReportService : ISalesReportService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public SalesReportService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> CreateSalesReportAsync(SalesReportCreateDto salesReportCreateDto)
        {
            var salesReport = _mapper.Map<SalesReport>(salesReportCreateDto);
            _context.SalesReports.Add(salesReport);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<SalesReportReadDto>> GetAllSalesReportsAsync()
        {
            var salesReports = await _context.SalesReports.ToListAsync();
            return _mapper.Map<IEnumerable<SalesReportReadDto>>(salesReports);
        }

        public async Task<SalesReportReadDto> GetSalesReportByIdAsync(int id)
        {
            var salesReport = await _context.SalesReports.FindAsync(id);
            return salesReport != null ? _mapper.Map<SalesReportReadDto>(salesReport) : null;
        }

        public async Task<bool> UpdateSalesReportAsync(int id, SalesReportUpdateDto salesReportUpdateDto)
        {
            var salesReport = await _context.SalesReports.FindAsync(id);
            if (salesReport == null) return false;

            _mapper.Map(salesReportUpdateDto, salesReport);
            _context.SalesReports.Update(salesReport);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

