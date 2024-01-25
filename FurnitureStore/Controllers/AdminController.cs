using FurnitureStore.Data.EfContext;
using FurnitureStore.Data.Entities.AppUser;
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
        public AdminController(IProjectService _projectService)
        {
            projectService = _projectService;
        }

        [HttpPost]
        [Route("add/project")]
        public IActionResult AddProject([FromForm] AddProjectModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode addProjectResult = projectService.AddProject(model);

            return StatusCode((int)addProjectResult);
        }

        [HttpGet]
        [Route("get/categories")]
        public IActionResult GetCategories()
        {
            var categories = projectService.GetAdminCategories();
            if (categories == null)
            {
                return BadRequest();
            }
            return Ok(categories);
        }

        [HttpPost]
        [Route("get/projects")]
        public IActionResult GetProjects([FromBody] ProjectPageModel model)
        {
            var projects = projectService.GetProjects(model);
            if (projects == null)
            {
                return BadRequest();
            }

            return Ok(projects);
        }

        [HttpDelete]
        [Route("delete/project/{projectId}")]
        public IActionResult DeleteProject(int projectId)
        {
            HttpStatusCode deleteProjectResult = projectService.DeleteProject(projectId);

            return StatusCode((int)deleteProjectResult);
        }

        [HttpPost]
        [Route("edit/project/{projectId}")]
        public IActionResult EditProject([FromForm] EditProjectModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode editProject = projectService.EditProject(model);

            return StatusCode((int)editProject);
        }
    }
}
