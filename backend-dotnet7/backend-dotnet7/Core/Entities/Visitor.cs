using System;

namespace backend_dotnet7.Core.Entities
{
    public class Visitor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public int ExhibitionId { get; set; } // Referenca për ekspozitën
        public Exhibition Exhibition { get; set; } // Ekspozita e regjistruar
    }
}

