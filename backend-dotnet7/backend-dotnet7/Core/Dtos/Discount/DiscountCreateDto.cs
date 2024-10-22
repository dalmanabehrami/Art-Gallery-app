namespace backend_dotnet7.Core.Dtos.Discount
{
    public class DiscountCreateDto
    {
        public int ArtworkId { get; set; }
        public decimal DiscountPercentage { get; set; } // e.g., 10 for 10%
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}

