using System.Collections.Generic;


namespace backend_dotnet7.Core.Entities
{
    public class Artist
    {
        public int Id { get; set; } 

        public string Name { get; set; } 
        public string Biography { get; set; } 

        public string ArtStyle { get; set; } 

        public string ProfileImageUrl { get; set; } 

        public List<Artwork> Artworks { get; set; }
    }
}
