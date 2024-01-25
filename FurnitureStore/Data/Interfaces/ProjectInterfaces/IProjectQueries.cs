using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Interfaces.ProjectInterfaces
{
    public interface IProjectQueries
    {
        IEnumerable<ProjectModel> GetProjects();

        List<ProjectModel> GetProjectsByCategoryName(string categoryName);
       // List<ProjectCardsModel> GetProjectsByCategoryName(string categoryName);

        List<GetAdminCategoriesModel> GetAdminCategories();

        //List<GetClientCategoriesModel> GetClientCategories();
        List<string> GetClientCategories();

        Category GetCategoryByProjectId(int projectId);

        ProjectModel GetProjectForUserById(int projectId);

        Project GetProjectById(int projectId);

        ProjectToCategory GetProjectToCategoryByProjectId(int projectId);

        List<ProjectToImage> GetProjectToImagesByProjectId(int projectId);

        IEnumerable<ProjectImage> GetProjectImagesByProjectId(int projectId);

        IEnumerable<string> GetStringProjectImages(int projectId);
    }
}
