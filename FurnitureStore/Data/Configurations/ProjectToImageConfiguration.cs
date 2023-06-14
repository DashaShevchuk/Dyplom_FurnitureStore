using FurnitureStore.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FurnitureStore.Data.Configurations
{
    public class ProjectToImageConfiguration : IEntityTypeConfiguration<ProjectToImage>
    {
        public void Configure(EntityTypeBuilder<ProjectToImage> builder)
        {
            builder.HasKey(e => new { e.ProjectId, e.ImageId });

            builder.HasOne(e => e.Project)
                .WithMany(e => e.ProjectImages)
                .HasForeignKey(e => e.ProjectId)
                .IsRequired();

            builder.HasOne(e => e.Image)
                .WithMany(e => e.ProjectImages)
                .HasForeignKey(e => e.ImageId)
                .IsRequired();
        }
    }
}
