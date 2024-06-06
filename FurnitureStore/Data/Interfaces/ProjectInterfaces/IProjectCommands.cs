using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Models.AdminModels;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Interfaces.ProjectInterfaces
{
    public interface IProjectCommands
    {
        Task CreateProjectAsync(Project project);

        Task CreateProjectImageAsync(ProjectImage projectImage, int projectId);

        Task CreateProjectToCategoryAsync(int projectId, int categoryId);

        Task DeleteProjectToImagesAsync(int projectId);

        Task DeleteProjectImagesAsync(int projectId);

        Task DeleteProjectCategoryAsync(int projectId);

        Task DeleteProjectAsync(int projectId);

        Task EditProjectAsync(Project project, EditProjectModel model);

        Task DeleteProjectsInCategoryAsync(int categoryId);
    }
}
