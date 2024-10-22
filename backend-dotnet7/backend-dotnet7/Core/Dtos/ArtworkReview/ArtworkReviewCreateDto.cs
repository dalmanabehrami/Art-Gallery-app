public class ArtworkReviewCreateDto
{
    public int ArtworkId { get; set; } // ID e veprës së artit
    public string UserName { get; set; } // Emri i përdoruesit
    public string Comment { get; set; } // Komenti i përdoruesit
    public int Rating { get; set; } // Vlerësimi (1-5)
}

