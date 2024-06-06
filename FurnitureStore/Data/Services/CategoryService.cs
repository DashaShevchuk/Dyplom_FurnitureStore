using FurnitureStore.Data.Entities;
using FurnitureStore.Data.Features.Projects;
using FurnitureStore.Data.Interfaces.CategoriesInterfaces;
using FurnitureStore.Data.Interfaces.ProjectInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryCommands categoryCommands;
        private readonly ICategoryQueries categoryQueries;
        private readonly IProjectCommands projectCommands;

        public CategoryService(ICategoryCommands categoryCommands, 
                               ICategoryQueries categoryQueries,
                               IProjectCommands projectCommands)
        {
            this.categoryCommands = categoryCommands;
            this.categoryQueries = categoryQueries;
            this.projectCommands = projectCommands;
        }

        public async Task<List<string>> GetClientCategoriesAsync()
        {
            return await categoryQueries.GetClientCategoriesAsync();
        }

        public async Task<HttpStatusCode> DeleteCategoryAsync(int categoryId)
        {
            if (categoryId == 0)
            {
                return HttpStatusCode.BadRequest;
            }

            await projectCommands.DeleteProjectsInCategoryAsync(categoryId);
            await categoryCommands.DeleteCategoryAsync(categoryId);

            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> EditCategoryAsync(CategoryModel model)
        {
            Category category = await categoryQueries.GetCategoryByIdAsync(model.Id);
            if (category == null)
            {
                return HttpStatusCode.NotFound;
            }

            await categoryCommands.EditCategoryAsync(category, model);

            return HttpStatusCode.OK;
        }

        public async Task<HttpStatusCode> AddCategoryAsync(CategoryModel model)
        {
            var newCategory = new Category
            {
                Name = model.Name,
            };

            await categoryCommands.CreateCategoryAsync(newCategory);

            return HttpStatusCode.OK;
        }

        public IEnumerable<CategoryModel> SortCategories(IEnumerable<CategoryModel> categories, string columnKey, string sortOrder)
        {
            if (columnKey == "name")
            {
                if (sortOrder == "ascend")
                {
                    return categories.OrderBy(x => x.Name);
                }
                else
                {
                    return categories.OrderByDescending(x => x.Name);
                }
            }

            return categories;
        }

        public async Task<GetCategoriesModel> GetCategoriesAsync(PageModel model)
        {
            IEnumerable<CategoryModel> categories = await categoryQueries.GetCategoriesAsync();
            int count = categories.Count();
            int skipPage = (model.Page - 1) * model.PageSize;

            if (model.SearchString != null)
            {
                categories = categories.Where(x => x.Name.ToLower()
                                                           .StartsWith(model.SearchString.ToLower()));
            }

            if (model.SortOrder != null && model.ColumnKey != null)
            {
                categories = SortCategories(categories, model.ColumnKey, model.SortOrder);
            }

            categories = categories.Skip(skipPage)
                                   .Take(model.PageSize);

            var resultModel = new GetCategoriesModel
            {
                Categories = categories.ToList(),
                TotalCount = count
            };

            return resultModel;
        }

        public async Task<List<GetAdminCategoriesModel>> GetAdminCategoriesAsync()
        {
            return await categoryQueries.GetAdminCategoriesAsync();
        }
    }
}
