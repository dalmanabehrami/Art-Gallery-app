namespace backend_dotnet7.Core.Dtos.Visitor
{
    public class VisitorStatisticsReadDto
    {
        public int Id { get; set; }                     // ID e statistikave të vizitorëve
        public DateTime ReportDate { get; set; }        // Data e gjenerimit të statistikave
        public int ExhibitionId { get; set; }            // Referenca për ekspozitën
        public string ExhibitionTitle { get; set; }      // Titulli i ekspozitës
        public int TotalVisitors { get; set; }           // Numri total i vizitorëve
    }
}

