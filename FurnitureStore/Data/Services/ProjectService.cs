using FurnitureStore.Data.EfContext;
using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Features.Users;
using FurnitureStore.Data.Interfaces.ProjectInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using FurnitureStore.Data.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Service
{
    public class ProjectService : IProjectService
    {
        private readonly IWebHostEnvironment env;
        private readonly IConfiguration configuration;
        private readonly IProjectCommands projectCommands;
        private readonly IProjectQueries projectQueries;
        public ProjectService(IWebHostEnvironment env, 
                              IConfiguration configuration, 
                              IProjectCommands projectCommands,
                              IProjectQueries projectQueries)
        {
            this.env = env;
            this.configuration = configuration;
            this.projectCommands = projectCommands;
            this.projectQueries = projectQueries;
        }

        public async Task<List<ProjectModel>> GetProjectsInCategoryAsync(string categoryName)
        {
            return await projectQueries.GetProjectsByCategoryNameAsync(categoryName);
        }

        public async Task<HttpStatusCode> AddProjectAsync(AddProjectModel model)
        {
            var newProject = new Project
            {
                Name = model.Name,
                Facade = model.Facade,
                Tabletop = model.Tabletop,
                Materials = model.Materials,
                Furniture = model.Furniture,
                Features = model.Features,
                Price = model.Price,
            };

            await projectCommands.CreateProjectAsync(newProject);
            await projectCommands.CreateProjectToCategoryAsync(newProject.Id, model.CategoryId);

            string fileDestDir = env.ContentRootPath;
            foreach (var pathConfig in new string[] { "ProjectsImagesFolderPath" })
            {
                fileDestDir = Path.Combine(fileDestDir, configuration.GetValue<string>(pathConfig));
            }
            foreach (var image in model.Images)
            {
                ProjectImage projectImage = new ProjectImage()
                {
                    Name = Guid.NewGuid().ToString() + ".jpg",
                };

                using (var fileStream = new FileStream(Path.Combine(fileDestDir, projectImage.Name), FileMode.Create))
                {
                    image.CopyTo(fileStream);
                    await projectCommands.CreateProjectImageAsync(projectImage, newProject.Id);
                }
            }
            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> DeleteProjectAsync(int projectId)
        {
            if (projectId == 0)
            {
                return HttpStatusCode.BadRequest;
            }
            var project = await projectQueries.GetProjectByIdAsync(projectId);
            var projectImages = await projectQueries.GetProjectImagesByProjectIdAsync(projectId);

            if (project == null)
            {
                return HttpStatusCode.NotFound;
            }

            string folderPath = $"ProjectsImages/";

            DirectoryInfo imageDirectory = new(folderPath);

            FileInfo[] files = imageDirectory.GetFiles();

            foreach (FileInfo file in files)
            {
                foreach (var image in projectImages)
                {
                    if (file.Name == image.Name)
                    {
                        file.Delete();
                    }
                }
            }

            await projectCommands.DeleteProjectToImagesAsync(projectId);
            await projectCommands.DeleteProjectImagesAsync(projectId);
            await projectCommands.DeleteProjectCategoryAsync(projectId);
            await projectCommands.DeleteProjectAsync(projectId);

            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> EditProjectAsync(EditProjectModel model)
        {
            Project project = await projectQueries.GetProjectByIdAsync(model.Id);
            if (project == null)
            {
                return HttpStatusCode.NotFound;
            }

            await projectCommands.EditProjectAsync(project, model);

            return HttpStatusCode.OK;
        }

        public IEnumerable<ProjectModel> SortProjects(IEnumerable<ProjectModel> projects, string columnKey, string sortOrder)
        {
            if (columnKey == "name")
            {
                if (sortOrder == "ascend")
                {
                    return projects.OrderBy(x => x.Name);
                }
                else
                {
                    return projects.OrderByDescending(x => x.Name);
                }
            }
            else if (columnKey == "category")
            {
                if (sortOrder == "ascend")
                {
                    return projects.OrderBy(x => x.CategoryName);
                }
                else
                {
                    return projects.OrderByDescending(x => x.CategoryName);
                }
            }
            else if (columnKey == "facade")
            {
                if (sortOrder == "ascend")
                {
                    return projects.OrderBy(x => x.Facade);
                }
                else
                {
                    return projects.OrderByDescending(x => x.Facade);
                }
            }
            else if (columnKey == "tabletop")
            {
                if (sortOrder == "ascend")
                {
                    return projects.OrderBy(x => x.Tabletop);
                }
                else
                {
                    return projects.OrderByDescending(x => x.Tabletop);
                }
            }
            else if (columnKey == "price")
            {
                if (sortOrder == "ascend")
                {
                    return projects.OrderBy(x => x.Price);
                }
                else
                {
                    return projects.OrderByDescending(x => x.Price);
                }
            }
            return projects;
        }

        public async Task<GetProjectsModel> GetProjectsAsync(PageModel model)
        {
            IEnumerable<ProjectModel> projects = await projectQueries.GetProjectsAsync();
            int count = projects.Count();
            int skipPage = (model.Page - 1) * model.PageSize;

            if (model.SearchString != null)
            {
                projects = projects.Where(x => x.Name.ToLower().StartsWith(model.SearchString.ToLower())
                                         || x.CategoryName.ToLower().StartsWith(model.SearchString.ToLower())
                                         || x.Facade.ToLower().StartsWith(model.SearchString.ToLower())
                                         || x.Tabletop.Contains(model.SearchString));
            }

            if (model.SortOrder != null && model.ColumnKey != null)
            {
                projects = SortProjects(projects, model.ColumnKey, model.SortOrder);
            }

            projects = projects.Skip(skipPage).Take(model.PageSize);

            var resultModel = new GetProjectsModel
            {
                Projects = projects.ToList(),
                TotalCount = count
            };

            return resultModel;
        }
      
    }
}
