using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Interfaces.ProjectInterfaces
{
    public interface IProjectService
    {
        Task<List<ProjectModel>> GetProjectsInCategoryAsync(string categoryName);

        Task<HttpStatusCode> AddProjectAsync(AddProjectModel model);

        Task<GetProjectsModel> GetProjectsAsync(PageModel model);

        Task<HttpStatusCode> DeleteProjectAsync(int projectId);

        Task<HttpStatusCode> EditProjectAsync(EditProjectModel model);

    }
}
