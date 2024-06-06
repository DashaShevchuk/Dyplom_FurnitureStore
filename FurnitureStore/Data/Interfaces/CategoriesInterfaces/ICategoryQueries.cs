using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Interfaces.CategoriesInterfaces
{
    public interface ICategoryQueries
    {
        Task<List<string>> GetClientCategoriesAsync();

        Task<IEnumerable<CategoryModel>> GetCategoriesAsync();

        Task<Category> GetCategoryByIdAsync(int categoryId);

        Task<Category> GetCategoryByNameAsync(string categoryName);

        Task<List<GetAdminCategoriesModel>> GetAdminCategoriesAsync();
    }
}
