namespace FurnitureStore.Data.Entities
{
    public class ProjectToImage
    {
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        public int ImageId { get; set; }
        public virtual ProjectImage Image { get; set; }
    }
}
