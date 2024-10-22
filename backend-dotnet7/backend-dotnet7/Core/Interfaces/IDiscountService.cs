using backend_dotnet7.Core.Dtos.Discount;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Interfaces
{
    public interface IDiscountService
    {
        Task<bool> CreateDiscountAsync(DiscountCreateDto discountCreateDto);
        Task<IEnumerable<DiscountReadDto>> GetAllDiscountsAsync();
        Task<DiscountReadDto> GetDiscountByIdAsync(int id); // Shto këtë metodë
        Task<bool> UpdateDiscountAsync(int id, DiscountUpdateDto discountUpdateDto);
        Task<bool> DeleteDiscountAsync(int id);
    }
}
