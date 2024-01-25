using FurnitureStore.Data.EfContext;
using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Features.Users;
using FurnitureStore.Data.Interfaces.ProjectInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;

namespace FurnitureStore.Data.Service
{
    public class ProjectService : IProjectService
    {
        private readonly IWebHostEnvironment env;
        private readonly IConfiguration configuration;
        private readonly IProjectCommands projectCommands;
        private readonly IProjectQueries projectQueries;
        public ProjectService(IWebHostEnvironment _env, 
                              IConfiguration _configuration, 
                              IProjectCommands _projectCommands,
                              IProjectQueries _projectQueries)
        {
            env = _env;
            configuration = _configuration;
            projectCommands = _projectCommands;
            projectQueries = _projectQueries;
        }

        public List<GetAdminCategoriesModel> GetAdminCategories()
        {
            return projectQueries.GetAdminCategories();
        }

        //public List<GetClientCategoriesModel> GetClientCategories()
        //{
        //    return projectQueries.GetClientCategories();
        //}
        public List<string> GetClientCategories()
        {
            return projectQueries.GetClientCategories();
        }

        public HttpStatusCode AddProject(AddProjectModel model)
        {
            var newProject = new Project
            {
                Name = model.Name,
                Facade = model.Facade,
                Tabletop = model.Tabletop,
                Materials = model.Materials,
                Furniture = model.Furniture,
                Features = model.Features,
            };
            
            projectCommands.CreateProject(newProject);
            projectCommands.CreateProjectToCategory(newProject.Id, model.CategoryId);

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
                    projectCommands.CreateProjectImage(projectImage, newProject.Id);
                }
            }
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
            return projects;
        }

        public GetProjectsModel GetProjects(ProjectPageModel model)
        {
            IEnumerable<ProjectModel> projects = projectQueries.GetProjects();
            int count = projects.Count();
            //int skipPage = (model.Page - 1) * model.PageSize;

            //if (model.SearchString != null)
            //{
            //    projects = projects.Where(x => x.Name.ToLower().StartsWith(model.SearchString.ToLower())
            //                             || x.CategoryName.ToLower().StartsWith(model.SearchString.ToLower())
            //                             || x.Facade.ToLower().StartsWith(model.SearchString.ToLower())
            //                             || x.Tabletop.Contains(model.SearchString));
            //}

            //if (model.SortOrder != null && model.ColumnKey != null)
            //{
            //    projects = SortProjects(projects, model.ColumnKey, model.SortOrder);
            //}

            //projects = projects.Skip(skipPage).Take(model.PageSize);

            var resultModel = new GetProjectsModel
            {
                Projects = projects.ToList(),
                TotalCount = count
            };

            return resultModel;
        }

        //public List<ProjectCardsModel> GetProjectsInCategory(string categoryName)
        //{
        //    return projectQueries.GetProjectsByCategoryName(categoryName);
        //}
        public List<ProjectModel> GetProjectsInCategory(string categoryName)
        {
            return projectQueries.GetProjectsByCategoryName(categoryName);
        }

        public HttpStatusCode DeleteProject(int projectId)
        {
            if (projectId == 0)
            {
                return HttpStatusCode.BadRequest;
            }
            var project = projectQueries.GetProjectById(projectId);
            var projectImages = projectQueries.GetProjectImagesByProjectId(projectId);

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

            projectCommands.DeleteProjectToImages(projectId);
            projectCommands.DeleteProjectImages(projectId);
            projectCommands.DeleteProjectCategory(projectId);
            projectCommands.DeleteProject(projectId);

            return HttpStatusCode.OK;
        }

        public HttpStatusCode EditProject(EditProjectModel model)
        {
            Project project = projectQueries.GetProjectById(model.Id);
            if (project == null)
            {
                return HttpStatusCode.NotFound;
            }

            projectCommands.EditProject(project, model);

            return HttpStatusCode.OK;
        }

        public ProjectModel GetProject(int projectId)
        {
            return projectQueries.GetProjectForUserById(projectId);
        }
    }
}
