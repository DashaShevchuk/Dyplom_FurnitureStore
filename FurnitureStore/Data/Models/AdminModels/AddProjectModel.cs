using FurnitureStore.Data.Entities;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace FurnitureStore.Data.Models.AdminModels
{
    public class AddProjectModel
    {
        public string Name { get; set; }

        public int CategoryId { get; set; }

        public string Facade { get; set; }

        public string Materials { get; set; }

        public string Furniture { get; set; }

        public string Tabletop { get; set; }

        public float Price { get; set; }

        public string Features { get; set; }

        public List<IFormFile> Images { get; set; }
    }
}
