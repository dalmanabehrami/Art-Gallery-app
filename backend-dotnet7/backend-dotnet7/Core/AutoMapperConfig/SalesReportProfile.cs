using AutoMapper;
using backend_dotnet7.Core.Dtos.SalesReport;
using backend_dotnet7.Core.Entities;

namespace backend_dotnet7.Core.Profiles
{
    public class SalesReportProfile : Profile
    {
        public SalesReportProfile()
        {
            CreateMap<SalesReportCreateDto, SalesReport>(); // Mapim nga DTO në Entity
            CreateMap<SalesReport, SalesReportReadDto>();   // Mapim nga Entity në DTO
            CreateMap<SalesReportUpdateDto, SalesReport>(); // Mapim nga Update DTO në Entity
        }
    }
}
