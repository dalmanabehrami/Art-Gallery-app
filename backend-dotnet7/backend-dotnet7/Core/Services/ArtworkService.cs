using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.Artwork; // Sigurohuni që emri i folderit të jetë i saktë
using backend_dotnet7.Core.Entities;
using backend_dotnet7.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Core.Services
{
    public class ArtworkService : IArtworkService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ArtworkService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ArtworkReadDto> CreateArtworkAsync(ArtworkCreatoDto artworkCreateDto)
        {
            try
            {
                var artwork = _mapper.Map<Artwork>(artworkCreateDto);
                artwork.CreatedAt = DateTime.Now; // Shtoni këtë linjë për të vendosur automatikisht CreatedAt

                await _context.ArtWorks.AddAsync(artwork);
                await _context.SaveChangesAsync();

                return _mapper.Map<ArtworkReadDto>(artwork);
            }
            catch (DbUpdateException dbEx)
            {
                // Logoni gabimin për të parë më shumë informacion
                Console.WriteLine($"Database error: {dbEx.InnerException?.Message}");
                throw; // Rithekni për të lejuar të tjerët ta kapin
            }
            catch (Exception ex)
            {
                // Logoni gabimin për të parë më shumë informacion
                Console.WriteLine($"General error: {ex.Message}");
                throw; // Rithekni për të lejuar të tjerët ta kapin
            }
        }

        public async Task<IEnumerable<ArtworkReadDto>> GetAllArtworksAsync()
        {
            var artworks = await _context.ArtWorks.ToListAsync();
            return _mapper.Map<IEnumerable<ArtworkReadDto>>(artworks);
        }

        public async Task<ArtworkReadDto> GetArtworkByIdAsync(int id)
        {
            var artwork = await _context.ArtWorks.FindAsync(id);
            if (artwork == null) return null; // Kthe null nëse nuk gjendet

            return _mapper.Map<ArtworkReadDto>(artwork);
        }

        public async Task<bool> UpdateArtworkAsync(int id, ArtworkCreatoDto artworkUpdateDto)
        {
            var artwork = await _context.ArtWorks.FindAsync(id);
            if (artwork == null) return false; // Kthe false nëse nuk gjendet

            _mapper.Map(artworkUpdateDto, artwork);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteArtworkAsync(int id)
        {
            var artwork = await _context.ArtWorks.FindAsync(id);
            if (artwork == null) return false; // Kthe false nëse nuk gjendet

            _context.ArtWorks.Remove(artwork);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}


