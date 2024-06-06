using FurnitureStore.Data.EfContext;
using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Interfaces.ProjectInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Features.Projects
{
    public class ProjectCommands:IProjectCommands
    {
        private readonly EfDbContext context;
        private readonly IProjectQueries projectQueries;
        private readonly IWebHostEnvironment env;
        private readonly IConfiguration configuration;
        public ProjectCommands(EfDbContext context, 
                               IProjectQueries projectQueries,
                               IWebHostEnvironment env,
                               IConfiguration configuration)
        {
            this.context = context;
            this.projectQueries = projectQueries;
            this.env = env;
            this.configuration = configuration;
        }

        public async Task CreateProjectAsync(Project project)
        {
            await context.Project.AddAsync(project);
            await context.SaveChangesAsync();
        }

        public async Task CreateProjectImageAsync(ProjectImage projectImage, int projectId)
        {
            await context.ProjectImage.AddAsync(projectImage);
            await context.SaveChangesAsync();
            ProjectToImage projectToImage = new ()
            {
                ProjectId = projectId,
                ImageId = projectImage.Id,
            };
            await context.ProjectToImage.AddAsync(projectToImage);
            await context.SaveChangesAsync();
        }

        public async Task CreateProjectToCategoryAsync(int projectId, int categoryId)
        {
            ProjectToCategory projectToCategory = new()
            {
                ProjectId = projectId,
                CategoryId = categoryId
            };
            await context.ProjectToCategories.AddAsync(projectToCategory);
            await context.SaveChangesAsync();
        }

        public async Task DeleteProjectCategoryAsync(int projectId)
        {
            ProjectToCategory projectToCategory = await projectQueries.GetProjectToCategoryByProjectIdAsync(projectId);
            context.ProjectToCategories.Remove(projectToCategory);
            await context.SaveChangesAsync();
        }

        public async Task DeleteProjectImagesAsync(int projectId)
        {
            List<ProjectImage> projectImages = await projectQueries.GetProjectImagesByProjectIdAsync(projectId);
            context.ProjectImage.RemoveRange(projectImages);
            await context.SaveChangesAsync();
        }

        public async Task DeleteProjectToImagesAsync(int projectId)
        {
            List<ProjectToImage> projectToImages = await projectQueries.GetProjectToImagesByProjectIdAsync(projectId);
            context.ProjectToImage.RemoveRange(projectToImages);
            await context.SaveChangesAsync();
        }

        public async Task DeleteProjectAsync(int projectId)
        {
            Project project = await projectQueries.GetProjectByIdAsync(projectId);
            context.Project.Remove(project);
            await context.SaveChangesAsync();
        }

        public async Task EditProjectAsync(Project project, EditProjectModel model)
        {
           if(project.Name != model.Name)
            {
                project.Name = model.Name;
            }
           
            if(project.Facade != model.Facade)
            {
                project.Facade = model.Facade;
            }
            
            if (project.Tabletop != model.Tabletop)
            {
                project.Tabletop = model.Tabletop;
            }

            if (project.Furniture != model.Furniture)
            {
                project.Furniture = model.Furniture;
            }

            if (project.Materials != model.Materials)
            {
                project.Materials = model.Materials;
            }

            if (project.Price != model.Price)
            {
                project.Price = model.Price;
            }

            if (project.Features != model.Features)
            {
                project.Features = model.Features;
            }

            ProjectToCategory projectToCategory = await projectQueries.GetProjectToCategoryByProjectIdAsync(project.Id);
            if (projectToCategory.CategoryId != model.CategoryId)
            {
                await DeleteProjectCategoryAsync(project.Id);
                await CreateProjectToCategoryAsync(project.Id, model.CategoryId);
            }

            if (model.Images != null)
            {
                var projectImages = await projectQueries.GetProjectImagesByProjectIdAsync(model.Id);
                foreach (var projectImage in projectImages)
                {
                    string imagePath = Path.Combine("ProjectsImages", projectImage.Name);
                    if (File.Exists(imagePath))
                    {
                        File.Delete(imagePath);
                    }
                }
                await DeleteProjectToImagesAsync(model.Id);
                await DeleteProjectImagesAsync(model.Id);

                string fileDestDir = env.ContentRootPath;
                foreach (var pathConfig in new string[] { "ProjectsImagesFolderPath" })
                {
                    fileDestDir = Path.Combine(fileDestDir, configuration.GetValue<string>(pathConfig));
                }

                foreach (var image in model.Images)
                {
                    ProjectImage projectImage = new ProjectImage()
                    {
                        Name = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName),
                    };

                    string fileDestPath = Path.Combine(fileDestDir, projectImage.Name);

                    using (var fileStream = new FileStream(fileDestPath, FileMode.Create))
                    {
                        image.CopyTo(fileStream);
                        await CreateProjectImageAsync(projectImage, project.Id);
                    }
                }
            }

            await context.SaveChangesAsync();
        }

        public async Task DeleteProjectsInCategoryAsync(int categoryId)
        {
           List<Project> projectsInCategory=await projectQueries.GetProjectsByCategoryIdAsync(categoryId);
           context.Project.RemoveRange(projectsInCategory);
           await context.SaveChangesAsync();
        }
    }
}
