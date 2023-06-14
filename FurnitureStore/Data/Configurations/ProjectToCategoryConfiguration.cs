using FurnitureStore.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FurnitureStore.Data.Configurations
{
    public class ProjectToCategoryConfiguration: IEntityTypeConfiguration<ProjectToCategory>
    {
        public void Configure(EntityTypeBuilder<ProjectToCategory> builder)
        {
            builder.HasKey(e => new { e.ProjectId, e.CategoryId });

            builder.HasOne(e => e.Project)
                .WithMany(e => e.ProjectCaregory)
                .HasForeignKey(e => e.ProjectId)
                .IsRequired();

            builder.HasOne(e => e.Category)
                .WithMany(e => e.ProjectCaregory)
                .HasForeignKey(e => e.CategoryId)
                .IsRequired();
        }
    }
}
