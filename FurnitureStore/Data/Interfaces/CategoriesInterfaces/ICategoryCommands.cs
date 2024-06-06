using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Models.AdminModels;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Interfaces.CategoriesInterfaces
{
    public interface ICategoryCommands
    {
        Task EditCategoryAsync(Category category, CategoryModel model);

        Task CreateCategoryAsync(Category category);

        Task DeleteCategoryAsync(int categoryId);
    }
}
