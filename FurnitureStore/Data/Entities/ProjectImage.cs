using System.Collections.Generic;

namespace FurnitureStore.Data.Entities
{
    public class ProjectImage
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<ProjectToImage> ProjectImages { get; set; }
    }
}
