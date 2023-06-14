using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Models.AdminModels;

namespace FurnitureStore.Data.Interfaces.ProjectInterfaces
{
    public interface IProjectCommands
    {
        void CreateProject(Project project);

        void CreateProjectImage(ProjectImage projectImage, int projectId);

        void CreateProjectToCategory(int projectId, int categoryId);

        void DeleteProjectToImages(int projectId);

        void DeleteProjectImages(int projectId);

        void DeleteProjectCategory(int projectId);

        void DeleteProject(int projectId);

        void EditProject(Project project, EditProjectModel model);
    }
}
