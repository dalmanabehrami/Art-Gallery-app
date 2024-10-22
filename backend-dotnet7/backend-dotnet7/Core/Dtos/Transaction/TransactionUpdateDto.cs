using System.ComponentModel.DataAnnotations;

namespace backend_dotnet7.Core.Dtos.Transaction
{
    public class TransactionUpdateDto
    {
        [Required]
        public decimal Amount { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [Required]
        public int ArtworkId { get; set; }

        // Shtoni pronësi të tjera sipas nevojës
    }
}

