using backend_dotnet7.Core.Entities;

public class SalesReport
{
    public int Id { get; set; }
    public DateTime ReportDate { get; set; } // Data kur është gjeneruar raporti
    public int ArtworkId { get; set; } // Referenca për veprën e artit
    public string ArtworkTitle { get; set; } // Titulli i veprës së artit
    public string ArtistName { get; set; } // Emri i artistit
    public int QuantitySold { get; set; } // Sasia e shitjeve
    public decimal TotalRevenue { get; set; } // Të ardhurat totale nga shitjet

    // Relacioni me Artwork për të tërhequr më shumë detaje
    public Artwork Artwork { get; set; }
}
