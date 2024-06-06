using FurnitureStore.Data.EfContext;
using FurnitureStore.Data.Entities.AppUser;
using FurnitureStore.Data.Interfaces.CategoriesInterfaces;
using FurnitureStore.Data.Interfaces.ProjectInterfaces;
using FurnitureStore.Data.Interfaces.UserInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FurnitureStore.Controllers
{
    //[Authorize(Roles = "Admin")]
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly IProjectService projectService;
        private readonly ICategoryService categoryService;
        public AdminController(IProjectService projectService, ICategoryService categoryService)
        {
            this.projectService = projectService;
            this.categoryService = categoryService;
        }

        [HttpPost]
        [Route("add/project")]
        public async Task<IActionResult> AddProject([FromForm] AddProjectModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode addProjectResult = await projectService.AddProjectAsync(model);

            return StatusCode((int)addProjectResult);
        }

        [HttpGet]
        [Route("get/categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await categoryService.GetAdminCategoriesAsync();
            if (categories == null)
            {
                return BadRequest();
            }
            return Ok(categories);
        }

        [HttpPost]
        [Route("get/projects")]
        public async Task<IActionResult> GetProjects([FromBody] PageModel model)
        {
            var projects = await projectService.GetProjectsAsync(model);
            if (projects == null)
            {
                return BadRequest();
            }

            return Ok(projects);
        }

        [HttpDelete]
        [Route("delete/project/{projectId}")]
        public async Task<IActionResult> DeleteProject(int projectId)
        {
            HttpStatusCode deleteProjectResult = await projectService.DeleteProjectAsync(projectId);

            return StatusCode((int)deleteProjectResult);
        }

        [HttpPost]
        [Route("edit/project/{projectId}")]
        public async Task<IActionResult> EditProject([FromForm] EditProjectModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode editProject = await projectService.EditProjectAsync(model);

            return StatusCode((int)editProject);
        }

        [HttpPost]
        [Route("get/categories")]
        public async Task<IActionResult> GetCategories([FromBody] PageModel model)
        {
            var categories = await categoryService.GetCategoriesAsync(model);
            if (categories == null)
            {
                return BadRequest();
            }

            return Ok(categories);
        }

        [HttpDelete]
        [Route("delete/category/{categoryId}")]
        public async Task<IActionResult> DeleteCategory(int categoryId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode deleteCategoryResult = await categoryService.DeleteCategoryAsync(categoryId);

            return StatusCode((int)deleteCategoryResult);
        }

        [HttpPost]
        [Route("edit/category/{categoryId}")]
        public async Task<IActionResult> EditCategory([FromForm] CategoryModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode editCategory = await categoryService.EditCategoryAsync(model);

            return StatusCode((int)editCategory);
        }


        [HttpPost]
        [Route("add/category")]
        public async Task<IActionResult> AddCategory([FromForm] CategoryModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode addCategoryResult = await categoryService.AddCategoryAsync(model);

            return StatusCode((int)addCategoryResult);
        }
    }
}
