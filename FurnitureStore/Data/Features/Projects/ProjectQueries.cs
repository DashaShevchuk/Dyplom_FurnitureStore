using FurnitureStore.Data.EfContext;
using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Interfaces.CategoriesInterfaces;
using FurnitureStore.Data.Interfaces.ProjectInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace FurnitureStore.Data.Features.Projects
{
    public class ProjectQueries : IProjectQueries
    {
        private readonly EfDbContext context;
        private readonly IConfiguration configuration;
        private readonly ICategoryQueries categoryQueries;
        public ProjectQueries(EfDbContext context,
                              IConfiguration configuration,
                              ICategoryQueries categoryQueries)
        {
            this.context = context;
            this.configuration = configuration;
            this.categoryQueries = categoryQueries;
        }
        public async Task<List<ProjectModel>> GetProjectsByCategoryNameAsync(string categoryName)
        {
            Category category = await categoryQueries.GetCategoryByNameAsync(categoryName);
            List<Project> projectInCategory = await context.ProjectToCategories
                .Where(x => x.CategoryId == category.Id)
                .Select(y => y.Project)
                .ToListAsync();

            List<ProjectModel> resultProjects = new List<ProjectModel>();
            foreach (var item in projectInCategory)
            {
                ProjectModel project = new ProjectModel
                {
                    Id = item.Id,
                    Name = item.Name,
                    Facade = item.Facade,
                    Tabletop = item.Tabletop,
                    Materials = item.Materials,
                    Furniture = item.Furniture,
                    Price = item.Price,
                    Features = item.Features,
                    ProjectImages = await GetStringProjectImagesAsync(item.Id), 
                    CategoryId = category.Id,
                    CategoryName = category.Name
                };
                resultProjects.Add(project);
            }
            return resultProjects;
        }

        public async Task<List<ProjectModel>> GetProjectsAsync()
        {
            List<ProjectModel> projects = new();
            foreach (var item in context.Project)
            {
                ProjectModel project = new ProjectModel
                {
                    Id = item.Id,
                    Name = item.Name,
                    Facade = item.Facade,
                    Tabletop = item.Tabletop,
                    Materials = item.Materials,
                    Furniture = item.Furniture,
                    Price = item.Price,
                    Features = item.Features
                };
                project.ProjectImages = await GetStringProjectImagesAsync(project.Id);
                Category category = await GetCategoryByProjectIdAsync(project.Id);
                project.CategoryName = category.Name;
                project.CategoryId = category.Id;
                projects.Add(project);
            }
            return projects;
        }

        public async Task<List<Project>> GetProjectsByCategoryIdAsync(int categoryId)
        {
            Category category = await categoryQueries.GetCategoryByIdAsync(categoryId);

            return await context.ProjectToCategories
                .Where(x => x.CategoryId == category.Id)
                .Select(y => y.Project)
                .ToListAsync();
        }

        public async Task<Project> GetProjectByIdAsync(int projectId)
        {
            return await context.Project.FirstOrDefaultAsync(x => x.Id == projectId);
        }

        public async Task<Category> GetCategoryByProjectIdAsync(int projectId)
        {
            ProjectToCategory projectToCategory = await context.ProjectToCategories.FirstOrDefaultAsync(x => x.ProjectId == projectId);
            return await categoryQueries.GetCategoryByIdAsync(projectToCategory.CategoryId);
        }

        public async Task<IEnumerable<string>> GetStringProjectImagesAsync(int projectId)
        {
            string path = $"{configuration.GetValue<string>("ProjectsImagesFolderPath")}/";

            IEnumerable<string> images = await context.ProjectToImage
                                                       .Where(x => x.ProjectId == projectId)
                                                       .Select(p => path + p.Image.Name)
                                                       .ToListAsync();
            return images;
        }

        public async Task<ProjectToCategory> GetProjectToCategoryByProjectIdAsync(int projectId)
        {
            return await context.ProjectToCategories.FirstOrDefaultAsync(x => x.ProjectId == projectId);
        }

        public async Task<List<ProjectToImage>> GetProjectToImagesByProjectIdAsync(int projectId)
        {
            return await context.ProjectToImage.Where(x => x.ProjectId == projectId)
                                               .ToListAsync();
        }

        public async Task<List<ProjectImage>> GetProjectImagesByProjectIdAsync(int projectId)
        {
            return await context.ProjectToImage.Where(x => x.ProjectId == projectId)
                                               .Select(x => x.Image)
                                               .ToListAsync();
        }
    }
}