using AutoMapper;
using backend_dotnet7.Core.Dtos.Discount;
using backend_dotnet7.Core.Entities;

namespace backend_dotnet7.Core.AutoMapperConfig
{
    public class DiscountProfile : Profile
    {
        public DiscountProfile()
        {
            CreateMap<Discount, DiscountReadDto>();
            CreateMap<DiscountCreateDto, Discount>();
            CreateMap<DiscountUpdateDto, Discount>();
        }
    }
}
