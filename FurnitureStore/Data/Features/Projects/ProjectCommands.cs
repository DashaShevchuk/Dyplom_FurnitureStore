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

namespace FurnitureStore.Data.Features.Projects
{
    public class ProjectCommands:IProjectCommands
    {
        private readonly EfDbContext context;
        private readonly IProjectQueries projectQueries;
        private readonly IWebHostEnvironment env;
        private readonly IConfiguration configuration;
        public ProjectCommands(EfDbContext _context, 
            IProjectQueries _projectQueries,
            IWebHostEnvironment _env,
            IConfiguration _configuration)
        {
            context = _context;
            projectQueries = _projectQueries;
            env = _env;
            configuration = _configuration;
        }

        public void CreateProject(Project project)
        {
            context.Project.Add(project);
            context.SaveChanges();
        }

        public void CreateProjectImage(ProjectImage projectImage, int projectId)
        {
            context.ProjectImage.Add(projectImage);
            context.SaveChanges();
            ProjectToImage projectToImage = new ()
            {
                ProjectId = projectId,
                ImageId = projectImage.Id,
            };
            context.ProjectToImage.Add(projectToImage);
            context.SaveChanges();
        }

        public void CreateProjectToCategory(int projectId, int categoryId)
        {
            ProjectToCategory projectToCategory = new()
            {
                ProjectId = projectId,
                CategoryId = categoryId
            };
            context.ProjectToCategories.Add(projectToCategory);
            context.SaveChanges();
        }

        public void DeleteProjectCategory(int projectId)
        {
            ProjectToCategory projectToCategory = projectQueries.GetProjectToCategoryByProjectId(projectId);
            context.ProjectToCategories.Remove(projectToCategory);
            context.SaveChanges();
        }

        public void DeleteProjectImages(int projectId)
        {
            IEnumerable<ProjectImage> projectImages = projectQueries.GetProjectImagesByProjectId(projectId);
            context.ProjectImage.RemoveRange(projectImages);
            context.SaveChanges();
        }

        public void DeleteProjectToImages(int projectId)
        {
            List<ProjectToImage> projectToImages = projectQueries.GetProjectToImagesByProjectId(projectId);
            context.ProjectToImage.RemoveRange(projectToImages);
            context.SaveChanges();
        }
        public void DeleteProject(int projectId)
        {
            Project project = projectQueries.GetProjectById(projectId);
            context.Project.Remove(project);
            context.SaveChanges();
        }

        public void EditProject(Project project, EditProjectModel model)
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
            
            if (project.Features != model.Features)
            {
                project.Features = model.Features;
            }

            ProjectToCategory projectToCategory = projectQueries.GetProjectToCategoryByProjectId(project.Id);
            if (projectToCategory.CategoryId != model.CategoryId)
            {
                DeleteProjectCategory(project.Id);
                CreateProjectToCategory(project.Id, model.CategoryId);
            }

            if (model.Images != null)
            {
                var projectImages = projectQueries.GetProjectImagesByProjectId(model.Id);
                foreach (var projectImage in projectImages)
                {
                    string imagePath = Path.Combine("ProjectsImages", projectImage.Name);
                    if (File.Exists(imagePath))
                    {
                        File.Delete(imagePath);
                    }
                }
                DeleteProjectToImages(model.Id);
                DeleteProjectImages(model.Id);

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
                        CreateProjectImage(projectImage, project.Id);
                    }
                }
            }

            context.SaveChanges();
        }
    }
}
