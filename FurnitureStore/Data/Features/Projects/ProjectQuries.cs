using FurnitureStore.Data.EfContext;
using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Interfaces.ProjectInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using System.Collections.Generic;
using System.Linq;

namespace FurnitureStore.Data.Features.Projects
{
    public class ProjectQuries : IProjectQueries
    {
        private readonly EfDbContext context;
        private readonly IConfiguration configuration;
        public ProjectQuries(EfDbContext _context, IConfiguration _configuration)
        {
            context = _context;
            configuration = _configuration;
        }

        public List<GetAdminCategoriesModel> GetAdminCategories()
        {
            return context.Categories.Select(x => new GetAdminCategoriesModel { Id = x.Id, Name = x.Name }).ToList();
        }
        //public List<GetClientCategoriesModel> GetClientCategories()
        //{
        //    string path = $"{configuration.GetValue<string>("CategoriesImagesFolderPath")}/";

        //    return context.Categories.Select(x => new GetClientCategoriesModel { Id = x.Id, Name = x.Name, ImagePath = path + x.ImagePath }).ToList();
        //}
        public List<string> GetClientCategories()
        {
            return context.Categories.Select(x => x.Name).ToList();
        }
        public Category GetCategoryByProjectId(int projectId)
        {
            ProjectToCategory projectToCategory = context.ProjectToCategories.FirstOrDefault(x => x.ProjectId == projectId);
            Category category = context.Categories.FirstOrDefault(x => x.Id == projectToCategory.CategoryId);
            return category;

            // Category category = context.Categories.FirstOrDefault(cat =>
            //cat.ProjectCaregory.Any(pc => pc.ProjectId == projectId));

            //if (projectToCategory != null)
            //{
            //    Category category = context.Categories.FirstOrDefault(x => x.Id == projectToCategory.CategoryId);
            //    return category;
            //}

            // return null;
        }

        public Project GetProjectById(int projectId)
        {
            return context.Project.FirstOrDefault(x => x.Id == projectId);
        }

        public IEnumerable<string> GetStringProjectImages(int projectId)
        {
            string path = $"{configuration.GetValue<string>("ProjectsImagesFolderPath")}/";

            IEnumerable<string> images = context.ProjectToImage
                                         .Where(x => x.ProjectId == projectId)
                                         .Select(p => path + p.Image.Name);
            return images;
        }
        //public List<ProjectCardsModel> GetProjectsByCategoryName(string categoryName)
        //{
        //    Category category = context.Categories.FirstOrDefault(x => x.Name == categoryName);
        //    List<Project> projectInCategory = context.ProjectToCategories
        //        .Where(x => x.CategoryId == category.Id)
        //        .Select(y => y.Project)
        //        .ToList();
        //    List<ProjectCardsModel> resultProjects = new List<ProjectCardsModel>();
        //    foreach (var item in projectInCategory)
        //    {
        //        ProjectCardsModel project = new()
        //        {
        //            Id = item.Id,
        //            Name = item.Name,
        //        };
        //        project.ProjectImages = GetStringProjectImages(project.Id);
        //        resultProjects.Add(project);
        //    }
        //    return resultProjects;
        //}
        public List<ProjectModel> GetProjectsByCategoryName(string categoryName)
        {
            Category category = context.Categories.FirstOrDefault(x => x.Name == categoryName);
            List<Project> projectInCategory = context.ProjectToCategories
                .Where(x => x.CategoryId == category.Id)
                .Select(y => y.Project)
                .ToList();
            List<ProjectModel> resultProjects = new List<ProjectModel>();
            foreach (var item in projectInCategory)
            {
                ProjectModel project = new()
                {
                    Id = item.Id,
                    Name = item.Name,
                    Facade = item.Facade,
                    Tabletop = item.Tabletop,
                    Materials = item.Materials,
                    Furniture = item.Furniture,
                    Features = item.Features
                };
                project.ProjectImages = GetStringProjectImages(project.Id);
                project.CategoryId= category.Id;
                project.CategoryName= category.Name;
                resultProjects.Add(project);
            }
            return resultProjects;
        }
        public IEnumerable<ProjectModel> GetProjects()
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
                    Features = item.Features
                };
                project.ProjectImages = GetStringProjectImages(project.Id);
                Category category = GetCategoryByProjectId(project.Id);
                project.CategoryName = category.Name;
                project.CategoryId = category.Id;
                projects.Add(project);
            }
            return projects;
        }

        public ProjectToCategory GetProjectToCategoryByProjectId(int projectId)
        {
            return context.ProjectToCategories.FirstOrDefault(x => x.ProjectId == projectId);
        }

        public List<ProjectToImage> GetProjectToImagesByProjectId(int projectId)
        {
            return context.ProjectToImage.Where(x => x.ProjectId == projectId).ToList();
        }

        public IEnumerable<ProjectImage> GetProjectImagesByProjectId(int projectId)
        {
            return context.ProjectToImage.Where(x => x.ProjectId == projectId).Select(x => x.Image);
        }

        public ProjectModel GetProjectForUserById(int projectId)
        {
            Project project = GetProjectById(projectId);
            ProjectModel resultProject = new ProjectModel
            {
                Id = project.Id,
                Name = project.Name,
                Facade = project.Facade,
                Tabletop = project.Tabletop,
                Materials = project.Materials,
                Furniture = project.Furniture,
                Features = project.Features
            };
            resultProject.ProjectImages = GetStringProjectImages(project.Id);
            Category category = GetCategoryByProjectId(project.Id);
            resultProject.CategoryName = category.Name;
            resultProject.CategoryId = category.Id;


            return resultProject;
        }
    }
}
