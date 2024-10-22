namespace backend_dotnet7.Core.Dtos.Visitor
{
    public class VisitorCreateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int ExhibitionId { get; set; } // Ekspozita për të cilën po regjistrohet vizitori
    }
}

