using System;
using System.Collections.Generic;

namespace backend_dotnet7.Core.Entities
{
    public class Exhibition
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }

        public ICollection<Artwork> Artworks { get; set; } 
        public ICollection<Visitor> Visitors { get; set; } 
    }
}

