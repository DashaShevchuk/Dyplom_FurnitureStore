using FurnitureStore.Data.EfContext;
using FurnitureStore.Data.Entities.AppUser;
using FurnitureStore.Data.Interfaces.UserInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using FurnitureStore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FurnitureStore.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<DbUser> userManager;
        private readonly SignInManager<DbUser> signInManager;
        private readonly EfDbContext context;
        private readonly IJwtTokenService jwtTokenService;
        private readonly IUserQueries userQueries;
        public AuthController(EfDbContext _context,
                               UserManager<DbUser> _userManager,
                               SignInManager<DbUser> _sigInManager,
                               IJwtTokenService _jwtTokenService,
                               IUserQueries _userQueries)
        {
            userManager = _userManager;
            signInManager = _sigInManager;
            context = _context;
            jwtTokenService = _jwtTokenService;
            userQueries = _userQueries;
        }
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await userQueries.GetUserByEmail(model.Email);
            if (user == null)
            {
                ModelState.AddModelError("Email", "Wrong email address");
                return BadRequest(ModelState);
            }

            var result = await signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (!result.Succeeded)
            {
                ModelState.AddModelError(string.Empty, "Wrong password");
                return BadRequest(ModelState);
            }

            if (!await userManager.IsEmailConfirmedAsync(user))
            {
                ModelState.AddModelError(string.Empty, "Email not confirmed");
                return Unauthorized(ModelState);
            }

            await signInManager.SignInAsync(user, isPersistent: false);

            var accessToken = jwtTokenService.CreateToken(user);
            var refreshToken = jwtTokenService.CreateRefreshToken(user);

            return Ok(new { token = accessToken, refreshToken });
        }
    }
}
