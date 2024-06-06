using System.Collections.Generic;

namespace FurnitureStore.Data.Entities
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<ProjectToCategory> ProjectCaregory { get; set; }
    }
}
