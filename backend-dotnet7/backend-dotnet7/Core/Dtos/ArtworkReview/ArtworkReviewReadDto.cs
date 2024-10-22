public class ArtworkReviewReadDto
{
    public int Id { get; set; } // ID e vlerësimit
    public int ArtworkId { get; set; } // ID e veprës së artit
    public string UserName { get; set; } // Emri i përdoruesit
    public string Comment { get; set; } // Komenti i përdoruesit
    public int Rating { get; set; } // Vlerësimi (1-5)
    public DateTime CreatedAt { get; set; } // Data e krijimit të vlerësimit
}

