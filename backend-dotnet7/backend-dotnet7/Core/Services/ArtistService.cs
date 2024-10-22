using AutoMapper;
using backend_dotnet7.Core.DbContext;
using backend_dotnet7.Core.Dtos.Artist;
using backend_dotnet7.Core.Entities;
using backend_dotnet7.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Core.Services
{
    public class ArtistService : IArtistService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ArtistService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ArtistReadDto> CreateArtistAsync(ArtistCreateDto artistCreateDto)
        {
            var artist = _mapper.Map<Artist>(artistCreateDto);

            await _context.Artists.AddAsync(artist);
            await _context.SaveChangesAsync();

            return _mapper.Map<ArtistReadDto>(artist);
        }

        public async Task<IEnumerable<ArtistReadDto>> GetAllArtistsAsync()
        {
            var artists = await _context.Artists.ToListAsync();
            return _mapper.Map<IEnumerable<ArtistReadDto>>(artists);
        }

        public async Task<ArtistReadDto> GetArtistByIdAsync(int id)
        {
            var artist = await _context.Artists.FindAsync(id);
            if (artist == null) return null;

            return _mapper.Map<ArtistReadDto>(artist);
        }

        public async Task<bool> UpdateArtistAsync(int id, ArtistUpdateDto artistUpdateDto)
        {
            var artist = await _context.Artists.FindAsync(id);
            if (artist == null) return false;

            _mapper.Map(artistUpdateDto, artist);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteArtistAsync(int id)
        {
            var artist = await _context.Artists.FindAsync(id);
            if (artist == null) return false;

            _context.Artists.Remove(artist);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

