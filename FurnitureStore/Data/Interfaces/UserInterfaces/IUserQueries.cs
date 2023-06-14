using FurnitureStore.Data.Entities.AppUser;
using FurnitureStore.Data.Models.AdminModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FurnitureStore.Data.Interfaces.UserInterfaces
{
    public interface IUserQueries
    {
        Task<DbUser> GetUserByEmail(string email);
    }
}
