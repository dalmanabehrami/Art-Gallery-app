using System;

namespace backend_dotnet7.Core.Entities
{
    public class Transaction
    {
        public int Id { get; set; }
        public int ArtworkId { get; set; }
        public int CustomerId { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string PaymentMethod { get; set; } // e.g., "Credit Card", "PayPal"

        // Relationship Properties
        public Artwork Artwork { get; set; }
        public Customer Customer { get; set; }
    }
}

