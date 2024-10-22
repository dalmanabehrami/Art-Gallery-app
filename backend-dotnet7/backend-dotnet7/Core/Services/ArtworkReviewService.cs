using backend_dotnet7.Core.Entities;
using backend_dotnet7.Core.Interfaces;
using backend_dotnet7.Core.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Services
{
    public class ArtworkReviewService : IArtworkReviewService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ArtworkReviewService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> CreateArtworkReviewAsync(ArtworkReviewCreateDto artworkReviewCreateDto)
        {
            var artworkReview = _mapper.Map<ArtworkReview>(artworkReviewCreateDto);
            await _context.ArtworkReviews.AddAsync(artworkReview);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<ArtworkReviewReadDto>> GetAllArtworkReviewsAsync()
        {
            var artworkReviews = await _context.ArtworkReviews.ToListAsync();
            return _mapper.Map<IEnumerable<ArtworkReviewReadDto>>(artworkReviews);
        }

        public async Task<ArtworkReviewReadDto> GetArtworkReviewByIdAsync(int id)
        {
            var artworkReview = await _context.ArtworkReviews.FindAsync(id);
            return artworkReview != null ? _mapper.Map<ArtworkReviewReadDto>(artworkReview) : null;
        }

        public async Task<bool> UpdateArtworkReviewAsync(int id, ArtworkReviewUpdateDto artworkReviewUpdateDto)
        {
            var artworkReview = await _context.ArtworkReviews.FindAsync(id);
            if (artworkReview == null) return false;

            _mapper.Map(artworkReviewUpdateDto, artworkReview);
            _context.ArtworkReviews.Update(artworkReview);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteArtworkReviewAsync(int id)
        {
            var artworkReview = await _context.ArtworkReviews.FindAsync(id);
            if (artworkReview == null) return false;

            _context.ArtworkReviews.Remove(artworkReview);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

