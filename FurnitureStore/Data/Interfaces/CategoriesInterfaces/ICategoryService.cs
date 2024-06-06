using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Interfaces.CategoriesInterfaces
{
    public interface ICategoryService
    {
        Task<List<string>> GetClientCategoriesAsync();

        Task<HttpStatusCode> DeleteCategoryAsync(int categoryId);

        Task<GetCategoriesModel> GetCategoriesAsync(PageModel model);

        Task<List<GetAdminCategoriesModel>> GetAdminCategoriesAsync();

        Task<HttpStatusCode> EditCategoryAsync(CategoryModel model);

        Task<HttpStatusCode> AddCategoryAsync(CategoryModel model);
    }
}
