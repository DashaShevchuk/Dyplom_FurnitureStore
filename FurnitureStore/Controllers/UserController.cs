using FurnitureStore.Data.Interfaces.ProjectInterfaces;
using FurnitureStore.Data.Interfaces.UserInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Data.Models.UserModels;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FurnitureStore.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IProjectService projectService;
        private readonly IUserService userService;

        public UserController(IProjectService _projectService, IUserService _userService)
        {
            projectService = _projectService;
            userService = _userService;
        }
        [HttpGet]
        [Route("categories")]
        public IActionResult GetCategories()
        {
            var categories = projectService.GetClientCategories();
            if (categories == null)
            {
                return BadRequest();
            }
            return Ok(categories);
        }

        [HttpPost]
        [Route("get/projects/{categoryName}")]
        public IActionResult GetProjects(string categoryName)
        {
            var projects = projectService.GetProjectsInCategory(categoryName);
            if (projects == null)
            {
                return BadRequest();
            }

            return Ok(projects);
        }
        [HttpPost]
        [Route("get/projects/{categoryName}/{projectId}")]
        public IActionResult GetProject([FromBody] GetProjectModel model)
        {
            var project = projectService.GetProject(model.ProjectId);
            if (project == null)
            {
                return BadRequest();
            }

            return Ok(project);
        }
        [HttpPost]
        [Route("feedback")]
        public IActionResult SendEmail([FromBody] FeedbackModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode sendEmailResult = userService.SendEmail(model);

            return StatusCode((int)sendEmailResult);
        }
    }
}
