using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Interfaces.ProjectInterfaces
{
    public interface IProjectQueries
    {
        Task<List<ProjectModel>> GetProjectsByCategoryNameAsync(string categoryName);

        Task<List<ProjectModel>> GetProjectsAsync();

        Task<List<Project>> GetProjectsByCategoryIdAsync(int categoryId);

        Task<Project> GetProjectByIdAsync(int projectId);

        Task<ProjectToCategory> GetProjectToCategoryByProjectIdAsync(int projectId);

        Task<List<ProjectToImage>> GetProjectToImagesByProjectIdAsync(int projectId);

        Task<List<ProjectImage>> GetProjectImagesByProjectIdAsync(int projectId);
    }
}
