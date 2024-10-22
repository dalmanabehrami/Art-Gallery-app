using backend_dotnet7.Core.Dtos.Artwork;

namespace backend_dotnet7.Core.Dtos.Artist
{
    public class ArtistCreateDto
    {
        public string Name { get; set; }
        public string Biography { get; set; }
        public string ArtStyle { get; set; }
        public string ProfileImageUrl { get; set; }
    }
}
