using AutoMapper;
using backend_dotnet7.Core.Dtos.Artist;
using backend_dotnet7.Core.Entities;

namespace backend_dotnet7.Core.AutoMapperConfig
{
    public class ArtistProfile : Profile
    {
        public ArtistProfile()
        {
            CreateMap<ArtistCreateDto, Artist>();
            CreateMap<Artist, ArtistReadDto>();
            CreateMap<ArtistUpdateDto, Artist>();
        }
    }
}

