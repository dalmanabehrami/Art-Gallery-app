namespace backend_dotnet7.Core.Dtos.Artwork
{
    public class ArtworkCreatoDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Artist { get; set; }
        public string ImageUrl { get; set; }
        public int YearCreated { get; set; }
        public decimal Price { get; set; }
    }
}
