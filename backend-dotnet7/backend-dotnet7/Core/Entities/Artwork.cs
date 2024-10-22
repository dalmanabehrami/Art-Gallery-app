using System.ComponentModel.DataAnnotations.Schema;

namespace backend_dotnet7.Core.Entities
{
    public class Artwork
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Artist { get; set; }

        public string ImageUrl { get; set; }

        public int YearCreated { get; set; }

        public decimal? Price { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [NotMapped]
        public IList<string> Tags { get; set; }
    }
}
    

