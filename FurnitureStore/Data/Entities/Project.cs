using System.Collections.Generic;

namespace FurnitureStore.Data.Entities
{
    public class Project
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Facade { get; set; }

        public string Tabletop { get; set; }

        public string Materials { get; set; }

        public string Furniture { get; set; }

        public string Features { get; set; }

        public virtual IEnumerable<ProjectToImage> ProjectImages { get; set; }

        public virtual ICollection<ProjectToCategory> ProjectCaregory { get; set; }
    }
}
