namespace backend_dotnet7.Core.Dtos.Visitor
{
    public class VisitorStatisticsUpdateDto
    {
        public DateTime ReportDate { get; set; }        // Data e gjenerimit të statistikave
        public int ExhibitionId { get; set; }            // Referenca për ekspozitën
        public int TotalVisitors { get; set; }           // Numri total i vizitorëve
    }
}

