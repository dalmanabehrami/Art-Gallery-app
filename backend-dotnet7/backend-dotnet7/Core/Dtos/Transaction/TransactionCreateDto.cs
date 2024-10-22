namespace backend_dotnet7.Core.Dtos.Transaction
{
    public class TransactionCreateDto
    {
        public int ArtworkId { get; set; }
        public int CustomerId { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string PaymentMethod { get; set; } // e.g., Credit Card, PayPal
    }
}
