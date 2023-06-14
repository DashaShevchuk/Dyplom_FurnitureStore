using FurnitureStore.Data.Entities.AppUser;
using FurnitureStore.Data.Interfaces.UserInterfaces;
using FurnitureStore.Data.Models.AdminModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Features.Users
{
    public class UserQueries : IUserQueries
    {
        private readonly UserManager<DbUser> userManager;
        public UserQueries(UserManager<DbUser> _userManager)
        {
            userManager = _userManager;
        }
        public async Task<DbUser> GetUserByEmail(string email)
        {
            return await userManager.FindByEmailAsync(email);
        }
    }
}
