namespace backend_dotnet7.Core.Dtos.Discount
{
    public class DiscountReadDto
    {
        public int Id { get; set; }
        public int ArtworkId { get; set; }
        public decimal DiscountPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ArtworkTitle { get; set; } // Optional, for convenience
    }
}
