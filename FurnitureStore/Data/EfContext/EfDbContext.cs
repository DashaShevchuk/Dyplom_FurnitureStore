using FurnitureStore.Data.Configurations;
using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Entities.AppUser;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FurnitureStore.Data.EfContext
{
    public class EfDbContext : IdentityDbContext<DbUser, DbRole, string, IdentityUserClaim<string>,
    DbUserRole, IdentityUserLogin<string>,
    IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public EfDbContext(DbContextOptions<EfDbContext> options)
           : base(options)
        {

        }

        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<ProjectImage> ProjectImage { get; set; }
        public virtual DbSet<ProjectToImage> ProjectToImage { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<ProjectToCategory> ProjectToCategories { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new DbUserConfiguration());
            modelBuilder.ApplyConfiguration(new DbRoleConfiguration());
            modelBuilder.ApplyConfiguration(new DbUserRoleConfiguration());
            modelBuilder.ApplyConfiguration(new ImageConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectToImageConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectToCategoryConfiguration());
        }
    }
}
