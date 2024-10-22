using AutoMapper;
using backend_dotnet7.Core.Dtos.Visitor;
using backend_dotnet7.Core.Entities;

namespace backend_dotnet7.Core.MappingProfiles
{
    public class VisitorProfile : Profile
    {
        public VisitorProfile()
        {
            // Mapimi nga Visitor në VisitorReadDto dhe anasjelltas
            CreateMap<Visitor, VisitorReadDto>();
            CreateMap<VisitorReadDto, Visitor>();

            // Mapimi nga VisitorCreateDto në Visitor dhe anasjelltas
            CreateMap<VisitorCreateDto, Visitor>();
            CreateMap<Visitor, VisitorCreateDto>();

            // Mapimi nga VisitorUpdateDto në Visitor
            CreateMap<VisitorUpdateDto, Visitor>();
        }
    }
}

