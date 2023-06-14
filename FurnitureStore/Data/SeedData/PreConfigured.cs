using FurnitureStore.Data.Entities.AppUser;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System;
using System.Linq;
using FurnitureStore.Data.EfContext;
using FurnitureStore.Data.Entities;

namespace FurnitureStore.Data.SeedData
{
    public class PreConfigured
    {
        public static void SeedRoles(RoleManager<DbRole> roleManager)
        {
            if (!roleManager.Roles.Any())
            {
                var result = roleManager.CreateAsync(new DbRole
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Admin",
                }).Result;
            }
        }

        public static async Task SeedUsers(UserManager<DbUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                DbUser admin = new DbUser
                {
                    Name = "Vitaliy",
                    LastName = "Shevchuk",
                    UserName = "Padre",
                    Email = "77shevchukm77@gmail.com",
                    EmailConfirmed = true
                };

                await userManager.CreateAsync(admin, "Qwerty-1");
                await userManager.AddToRoleAsync(admin, "Admin");
            }
        }
        public static void SeedCategories(EfDbContext context)
        {
            Category category1 = new ()
            {
                Name = "Кухня",
                ImagePath= "kitchen.jpg"
            };
            Category category2 = new ()
            {
                Name = "Дитяча",
                ImagePath = "children-room.jpg"
            };
            Category category3 = new ()
            {
                Name = "Передпокій",
                ImagePath = "hallway.jpg"
            };
            Category category4 = new()
            {
                Name = "Вітальня",
                ImagePath = "living-room.jpg"
            };
            Category category5 = new()
            {
                Name = "Спальня",
                ImagePath = "bedroom.jpg"
            };
            Category category6 = new()
            {
                Name = "Гардероб",
                ImagePath = "wardrobe.jpg"
            };
            Category category7 = new()
            {
                Name = "Офісні меблі",
                ImagePath = "office-furniture.jpg"
            };
            context.Categories.Add(category1);
            context.Categories.Add(category2);
            context.Categories.Add(category3);
            context.Categories.Add(category4);
            context.Categories.Add(category5);
            context.Categories.Add(category6);
            context.Categories.Add(category7);

            context.SaveChanges();
        }
    }
}
