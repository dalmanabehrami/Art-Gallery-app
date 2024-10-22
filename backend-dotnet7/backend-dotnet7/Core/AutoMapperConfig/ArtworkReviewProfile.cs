using AutoMapper;
using backend_dotnet7.Core.Entities;

public class ArtworkReviewProfile : Profile
{
    public ArtworkReviewProfile()
    {
        // Map to DTO
        CreateMap<ArtworkReview, ArtworkReviewReadDto>();
        CreateMap<ArtworkReviewCreateDto, ArtworkReview>();
        CreateMap<ArtworkReviewUpdateDto, ArtworkReview>();
    }
}

