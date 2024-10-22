using backend_dotnet7.Core.Dtos.Visitor;
using backend_dotnet7.Core.Entities;
using backend_dotnet7.Core.Interfaces;
using backend_dotnet7.Core.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Services
{
    public class VisitorService : IVisitorService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public VisitorService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> RegisterVisitorAsync(VisitorCreateDto visitorCreateDto)
        {
            var visitor = _mapper.Map<Visitor>(visitorCreateDto);
            _context.Visitors.Add(visitor);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<VisitorReadDto>> GetAllVisitorsAsync()
        {
            var visitors = await _context.Visitors.ToListAsync();
            return _mapper.Map<IEnumerable<VisitorReadDto>>(visitors);
        }

        public async Task<VisitorReadDto> GetVisitorByIdAsync(int id)
        {
            var visitor = await _context.Visitors.FindAsync(id);
            return visitor != null ? _mapper.Map<VisitorReadDto>(visitor) : null;
        }

        public async Task<bool> UpdateVisitorAsync(int id, VisitorUpdateDto visitorUpdateDto)
        {
            var visitor = await _context.Visitors.FindAsync(id);
            if (visitor == null) return false;

            _mapper.Map(visitorUpdateDto, visitor);
            _context.Visitors.Update(visitor);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteVisitorAsync(int id)
        {
            var visitor = await _context.Visitors.FindAsync(id);
            if (visitor == null) return false;

            _context.Visitors.Remove(visitor);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

