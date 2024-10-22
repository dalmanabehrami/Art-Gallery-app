namespace backend_dotnet7.Core.Dtos.Transaction
{
    public class TransactionReadDto
    {
        public int Id { get; set; }
        public int ArtworkId { get; set; }
        public int CustomerId { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string PaymentMethod { get; set; }
        public string ArtworkTitle { get; set; } // Optional, for convenience
        public string CustomerName { get; set; } // Optional, for convenience
    }
}
