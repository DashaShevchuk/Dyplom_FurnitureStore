namespace FurnitureStore.Data.Entities
{
    public class ProjectToCategory
    {
        public int ProjectId { get; set; }

        public virtual Project Project { get; set; }

        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}
