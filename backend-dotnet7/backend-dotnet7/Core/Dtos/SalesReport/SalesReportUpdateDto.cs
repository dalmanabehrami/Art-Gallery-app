namespace backend_dotnet7.Core.Dtos.SalesReport
{
    public class SalesReportUpdateDto
    {
        public int Id { get; set; } 
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalSales { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TopSellingArtistId { get; set; }
    }
}

