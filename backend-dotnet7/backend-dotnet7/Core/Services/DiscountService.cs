using backend_dotnet7.Core.Dtos.Discount;
using backend_dotnet7.Core.Entities;
using backend_dotnet7.Core.Interfaces;
using backend_dotnet7.Core.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public DiscountService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> CreateDiscountAsync(DiscountCreateDto discountCreateDto)
        {
            var discount = _mapper.Map<Discount>(discountCreateDto);
            _context.Discounts.Add(discount);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<DiscountReadDto>> GetAllDiscountsAsync()
        {
            var discounts = await _context.Discounts.ToListAsync();
            return _mapper.Map<IEnumerable<DiscountReadDto>>(discounts);
        }

        public async Task<DiscountReadDto> GetDiscountByIdAsync(int id)
        {
            var discount = await _context.Discounts.FindAsync(id);
            return discount != null ? _mapper.Map<DiscountReadDto>(discount) : null;
        }

        public async Task<bool> UpdateDiscountAsync(int id, DiscountUpdateDto discountUpdateDto)
        {
            var discount = await _context.Discounts.FindAsync(id);
            if (discount == null) return false;

            _mapper.Map(discountUpdateDto, discount);
            _context.Discounts.Update(discount);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteDiscountAsync(int id)
        {
            var discount = await _context.Discounts.FindAsync(id);
            if (discount == null) return false;

            _context.Discounts.Remove(discount);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
