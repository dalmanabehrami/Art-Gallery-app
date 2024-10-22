using System.Collections.Generic;

namespace backend_dotnet7.Core.Entities
{
    public class ArtCategory
    {
        public int Id { get; set; } // ID e kategorisë
        public string Name { get; set; } // Emri i kategorisë
        public string Description { get; set; } // Përshkrimi i kategorisë

        // Lista e veprave të artit të lidhura me këtë kategori
        public ICollection<Artwork> Artworks { get; set; }
    }
}

