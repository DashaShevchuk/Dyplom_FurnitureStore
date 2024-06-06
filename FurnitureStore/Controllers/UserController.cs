using FurnitureStore.Data.Interfaces.CategoriesInterfaces;
using FurnitureStore.Data.Interfaces.ProjectInterfaces;
using FurnitureStore.Data.Interfaces.UserInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

namespace FurnitureStore.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IProjectService projectService;
        private readonly ICategoryService categoryService;

        public UserController(IProjectService projectService, 
                              ICategoryService categoryService)
        {
            this.projectService = projectService;
            this.categoryService = categoryService;
        }
        [HttpGet]
        [Route("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await categoryService.GetClientCategoriesAsync();
            if (categories == null)
            {
                return BadRequest();
            }
            return Ok(categories);
        }

        [HttpPost]
        [Route("projects/{categoryName}")]
        public async Task<IActionResult> GetProjects(string categoryName)
        {
            var projects = await projectService.GetProjectsInCategoryAsync(categoryName);
            if (projects == null)
            {
                return BadRequest();
            }

            return Ok(projects);
        }
    }
}