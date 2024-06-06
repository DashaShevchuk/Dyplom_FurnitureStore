using FurnitureStore.Data.EfContext;
using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Interfaces.CategoriesInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Features.Categories
{
    public class CategoryQueries : ICategoryQueries
    {
        private readonly EfDbContext context;
        public CategoryQueries(EfDbContext context)
        {
            this.context= context;
        }
        public async Task<List<string>> GetClientCategoriesAsync()
        {
            return await context.Categories
                            .Select(x => x.Name )
                            .ToListAsync();
        }

        public async Task<IEnumerable<CategoryModel>> GetCategoriesAsync()
        {
            var categories = await context.Categories
                                          .Select(item => new CategoryModel
                                          {
                                              Id = item.Id,
                                              Name = item.Name,
                                          })
                                          .ToListAsync();

            return categories;
        }

        public async Task<Category> GetCategoryByIdAsync(int categoryId)
        {
            return await context.Categories.FirstOrDefaultAsync(x => x.Id == categoryId);
        }

        public async Task<Category> GetCategoryByNameAsync(string categoryName)
        {
            return await context.Categories.FirstOrDefaultAsync(x => x.Name == categoryName);
        }

        public async Task<List<GetAdminCategoriesModel>> GetAdminCategoriesAsync()
        {
            return await context.Categories.Select(x => new GetAdminCategoriesModel { Id = x.Id, Name = x.Name }).ToListAsync();
        }
    }
}
