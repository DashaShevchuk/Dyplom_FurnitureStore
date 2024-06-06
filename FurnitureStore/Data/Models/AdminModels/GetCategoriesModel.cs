using System.Collections.Generic;

namespace FurnitureStore.Data.Models.AdminModels
{
    public class GetCategoriesModel
    {
        public List<CategoryModel> Categories { get; set; }

        public int TotalCount { get; set; }
    }
}
