using AutoMapper;
using backend_dotnet7.Core.Dtos.Exhibition;
using backend_dotnet7.Core.Entities;

namespace backend_dotnet7.Core.MappingProfiles
{
    public class ExhibitionProfile : Profile
    {
        public ExhibitionProfile()
        {
            // Mapimi nga Exhibition në ExhibitionReadDto dhe anasjelltas
            CreateMap<Exhibition, ExhibitionReadDto>();
            CreateMap<ExhibitionReadDto, Exhibition>();

            // Mapimi nga ExhibitionCreateDto në Exhibition dhe anasjelltas
            CreateMap<ExhibitionCreateDto, Exhibition>();
            CreateMap<Exhibition, ExhibitionCreateDto>();

            // Mapimi nga ExhibitionUpdateDto në Exhibition
            CreateMap<ExhibitionUpdateDto, Exhibition>();
        }
    }
}

