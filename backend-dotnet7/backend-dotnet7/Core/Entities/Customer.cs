using System.Collections.Generic;

namespace backend_dotnet7.Core.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        // Koleksion për historikun e blerjeve
        public List<Artwork> PurchaseHistory { get; set; } = new List<Artwork>();
    }
}

