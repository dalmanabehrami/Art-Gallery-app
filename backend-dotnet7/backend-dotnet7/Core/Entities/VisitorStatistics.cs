using backend_dotnet7.Core.Entities;

public class VisitorStatistics
{
    public int Id { get; set; }
    public DateTime ReportDate { get; set; } // Data e gjenerimit të statistikave
    public int ExhibitionId { get; set; } // Referenca për ekspozitën
    public string ExhibitionTitle { get; set; } // Titulli i ekspozitës
    public int TotalVisitors { get; set; } // Numri total i vizitorëve

    // Relacioni me Exhibition për detaje shtesë
    public Exhibition Exhibition { get; set; }
}
