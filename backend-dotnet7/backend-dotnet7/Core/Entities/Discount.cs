using System;

namespace backend_dotnet7.Core.Entities
{
    public class Discount
    {
        public int Id { get; set; }
        public string Code { get; set; } // e.g., "DISCOUNT20"
        public decimal Percentage { get; set; } // e.g., 0.20 for 20%
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}

