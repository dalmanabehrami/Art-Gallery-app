using AutoMapper;
using backend_dotnet7.Core.Entities;

public class ArtCategoryProfile : Profile
{
    public ArtCategoryProfile()
    {
        // Map to DTO
        CreateMap<ArtCategory, ArtCategoryReadDto>();
        CreateMap<ArtCategoryCreateDto, ArtCategory>();
        CreateMap<ArtCategoryUpdateDto, ArtCategory>();
    }
}

