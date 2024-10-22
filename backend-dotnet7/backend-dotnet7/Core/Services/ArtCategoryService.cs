using backend_dotnet7.Core.Entities;
using backend_dotnet7.Core.Interfaces;
using backend_dotnet7.Core.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Core.Services
{
    public class ArtCategoryService : IArtCategoryService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ArtCategoryService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> CreateArtCategoryAsync(ArtCategoryCreateDto artCategoryCreateDto)
        {
            var artCategory = _mapper.Map<ArtCategory>(artCategoryCreateDto);
            await _context.ArtCategories.AddAsync(artCategory);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<ArtCategoryReadDto>> GetAllArtCategoriesAsync()
        {
            var artCategories = await _context.ArtCategories.ToListAsync();
            return _mapper.Map<IEnumerable<ArtCategoryReadDto>>(artCategories);
        }

        public async Task<ArtCategoryReadDto> GetArtCategoryByIdAsync(int id)
        {
            var artCategory = await _context.ArtCategories.FindAsync(id);
            return artCategory != null ? _mapper.Map<ArtCategoryReadDto>(artCategory) : null;
        }

        public async Task<bool> UpdateArtCategoryAsync(int id, ArtCategoryUpdateDto artCategoryUpdateDto)
        {
            var artCategory = await _context.ArtCategories.FindAsync(id);
            if (artCategory == null) return false;

            _mapper.Map(artCategoryUpdateDto, artCategory);
            _context.ArtCategories.Update(artCategory);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteArtCategoryAsync(int id)
        {
            var artCategory = await _context.ArtCategories.FindAsync(id);
            if (artCategory == null) return false;

            _context.ArtCategories.Remove(artCategory);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

