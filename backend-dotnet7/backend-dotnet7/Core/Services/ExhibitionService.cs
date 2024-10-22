using backend_dotnet7.Core.Dtos.Exhibition;
using backend_dotnet7.Core.Entities;
using backend_dotnet7.Core.Interfaces;
using backend_dotnet7.Core.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Services
{
    public class ExhibitionService : IExhibitionService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ExhibitionService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> CreateExhibitionAsync(ExhibitionCreateDto exhibitionCreateDto)
        {
            var exhibition = _mapper.Map<Exhibition>(exhibitionCreateDto);
            _context.Exhibitions.Add(exhibition);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<ExhibitionReadDto>> GetAllExhibitionsAsync()
        {
            var exhibitions = await _context.Exhibitions.ToListAsync();
            return _mapper.Map<IEnumerable<ExhibitionReadDto>>(exhibitions);
        }

        public async Task<ExhibitionReadDto> GetExhibitionByIdAsync(int id)
        {
            var exhibition = await _context.Exhibitions.FindAsync(id);
            return exhibition != null ? _mapper.Map<ExhibitionReadDto>(exhibition) : null;
        }

        public async Task<bool> UpdateExhibitionAsync(int id, ExhibitionUpdateDto exhibitionUpdateDto)
        {
            var exhibition = await _context.Exhibitions.FindAsync(id);
            if (exhibition == null) return false;

            _mapper.Map(exhibitionUpdateDto, exhibition); // Përdor AutoMapper për të përditësuar entitetin
            _context.Exhibitions.Update(exhibition);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteExhibitionAsync(int id)
        {
            var exhibition = await _context.Exhibitions.FindAsync(id);
            if (exhibition == null) return false;

            _context.Exhibitions.Remove(exhibition);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

