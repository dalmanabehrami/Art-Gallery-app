namespace backend_dotnet7.Core.Dtos.Discount
{
    public class DiscountUpdateDto
    {
        public string Name { get; set; }
        public decimal Percentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}

