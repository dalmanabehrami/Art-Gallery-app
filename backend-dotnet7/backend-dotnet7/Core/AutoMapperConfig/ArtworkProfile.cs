using AutoMapper;
using backend_dotnet7.Core.Dtos.Artwork;
using backend_dotnet7.Core.Entities;

namespace backend_dotnet7.Core.AutoMapperConfig
{
    public class ArtworkProfile : Profile
    {
        public ArtworkProfile()
        {
            // Mapping për krijimin e Artwork
            CreateMap<ArtworkCreatoDto, Artwork>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.Now)); // Vendos CreatedAt automatikisht

            // Mapping për leximin e Artwork
            CreateMap<Artwork, ArtworkReadDto>();
        }
    }
}

