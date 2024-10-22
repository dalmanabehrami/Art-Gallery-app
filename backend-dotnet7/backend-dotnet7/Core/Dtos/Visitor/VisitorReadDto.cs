namespace backend_dotnet7.Core.Dtos.Visitor
{
    public class VisitorReadDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int ExhibitionId { get; set; }
        public string ExhibitionTitle { get; set; } // Emri i ekspozitës për lehtësi
    }
}

