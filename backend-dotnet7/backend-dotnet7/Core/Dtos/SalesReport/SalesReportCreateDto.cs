using System;

namespace backend_dotnet7.Core.Dtos.SalesReport
{
    public class SalesReportCreateDto
    {
        public DateTime StartDate { get; set; } // Data e fillimit të raportit
        public DateTime EndDate { get; set; }   // Data e mbarimit të raportit
        public int TotalSales { get; set; }      // Numri total i shitjeve
        public decimal TotalRevenue { get; set; } // Të ardhurat totale
        public int TopSellingArtistId { get; set; } // ID e artistit më të shitur
    }
}

