using FurnitureStore.Data.EfContext;
using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Features.Projects;
using FurnitureStore.Data.Interfaces.CategoriesInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Features.Categories
{
    public class CategoryCommands : ICategoryCommands
    {
        private readonly EfDbContext context;
        private readonly ICategoryQueries categoryQueries;
        public CategoryCommands(EfDbContext context, 
                                ICategoryQueries categoryQueries)
        {
            this.context = context;
            this.categoryQueries = categoryQueries;
        }
        public async Task EditCategoryAsync(Category category, CategoryModel model)
        {
            if (category.Name != model.Name)
            {
                category.Name = model.Name;
            }

            await context.SaveChangesAsync();
        }

        public async Task CreateCategoryAsync(Category category)
        {
            await context.Categories.AddAsync(category);
            await context.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(int categoryId)
        {
            Category category = await categoryQueries.GetCategoryByIdAsync(categoryId);
            context.Categories.Remove(category);
            await context.SaveChangesAsync();
        }
    }
}
