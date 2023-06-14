using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using System.Collections;
using System.Collections.Generic;
using System.Net;

namespace FurnitureStore.Data.Interfaces.ProjectInterfaces
{
    public interface IProjectService
    {
        public List<GetAdminCategoriesModel> GetAdminCategories();

        public List<GetClientCategoriesModel> GetClientCategories();

        public HttpStatusCode AddProject(AddProjectModel model);

        public GetProjectsModel GetProjects(ProjectPageModel model);

        public List<ProjectCardsModel> GetProjectsInCategory(string categoryName);

        public HttpStatusCode DeleteProject(int projectId);

        public HttpStatusCode EditProject(EditProjectModel model);

        public ProjectModel GetProject(int projectId);
    }
}
