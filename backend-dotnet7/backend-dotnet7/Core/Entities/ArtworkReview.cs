using System;

namespace backend_dotnet7.Core.Entities
{
    public class ArtworkReview
    {
        public int Id { get; set; } // ID e vlerësimit
        public int ArtworkId { get; set; } // ID e veprës së artit
        public string UserName { get; set; } // Emri i përdoruesit që lë vlerësimin
        public string Comment { get; set; } // Komenti i përdoruesit
        public int Rating { get; set; } // Vlerësimi (p.sh. 1-5)
        public DateTime CreatedAt { get; set; } // Data e krijimit të vlerësimit

        // Relacioni me veprën e artit
        public Artwork Artwork { get; set; }
    }
}

