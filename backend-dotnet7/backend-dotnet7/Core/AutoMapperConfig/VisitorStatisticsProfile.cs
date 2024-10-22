using AutoMapper;
using backend_dotnet7.Core.Dtos.Visitor;

namespace backend_dotnet7.Core.Profiles
{
    public class VisitorStatisticsProfile : Profile
    {
        public VisitorStatisticsProfile()
        {
            // Mapimi nga VisitorStatistics në VisitorStatisticsReadDto
            CreateMap<VisitorStatistics, VisitorStatisticsReadDto>()
                .ForMember(dest => dest.ExhibitionTitle, opt => opt.MapFrom(src => src.Exhibition.Title)); // Mappimi për titullin e ekspozitës

            // Mapimi nga VisitorStatisticsCreateDto në VisitorStatistics
            CreateMap<VisitorStatisticsCreateDto, VisitorStatistics>();

            // Mapimi nga VisitorStatisticsUpdateDto në VisitorStatistics
            CreateMap<VisitorStatisticsUpdateDto, VisitorStatistics>();
        }
    }
}

