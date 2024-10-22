using backend_dotnet7.Core.Interfaces;
using backend_dotnet7.Core.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using backend_dotnet7.Core.Dtos.Visitor;

namespace backend_dotnet7.Core.Services
{
    public class VisitorStatisticsService : IVisitorStatisticsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public VisitorStatisticsService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> CreateVisitorStatisticsAsync(VisitorStatisticsCreateDto visitorStatisticsCreateDto)
        {
            var visitorStatistics = _mapper.Map<VisitorStatistics>(visitorStatisticsCreateDto);
            _context.VisitorStatistics.Add(visitorStatistics);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<VisitorStatisticsReadDto>> GetAllVisitorStatisticsAsync()
        {
            var visitorStatistics = await _context.VisitorStatistics.Include(v => v.Exhibition).ToListAsync();
            return _mapper.Map<IEnumerable<VisitorStatisticsReadDto>>(visitorStatistics);
        }

        public async Task<VisitorStatisticsReadDto> GetVisitorStatisticsByIdAsync(int id)
        {
            var visitorStatistics = await _context.VisitorStatistics.FindAsync(id);
            return visitorStatistics != null ? _mapper.Map<VisitorStatisticsReadDto>(visitorStatistics) : null;
        }

        public async Task<bool> UpdateVisitorStatisticsAsync(int id, VisitorStatisticsUpdateDto visitorStatisticsUpdateDto)
        {
            var visitorStatistics = await _context.VisitorStatistics.FindAsync(id);
            if (visitorStatistics == null) return false;

            _mapper.Map(visitorStatisticsUpdateDto, visitorStatistics);
            _context.VisitorStatistics.Update(visitorStatistics);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteVisitorStatisticsAsync(int id)
        {
            var visitorStatistics = await _context.VisitorStatistics.FindAsync(id);
            if (visitorStatistics == null) return false;

            _context.VisitorStatistics.Remove(visitorStatistics);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
