using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace FurnitureStore.Data.Models.AdminModels
{
    public class UploadImagesModel
    {
        public int ProjectId { get; set; }
        public List<IFormFile> Images { get; set; }
    }
}
