namespace FurnitureStore.Data.Models.AdminModels
{
    public class ProjectPageModel
    {
        public int Page { get; set; }

        public int PageSize { get; set; }

        public string SortOrder { get; set; }

        public string ColumnKey { get; set; }

        public string SearchString { get; set; }
    }
}
