using System.Collections.Generic;

namespace FurnitureStore.Data.Models.AdminModels
{
    public class GetProjectsModel
    {
        public List<ProjectModel> Projects { get; set; }

        public int TotalCount { get; set; }
    }
}
