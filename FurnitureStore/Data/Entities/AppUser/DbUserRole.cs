using Microsoft.AspNetCore.Identity;

namespace FurnitureStore.Data.Entities.AppUser
{
    public class DbUserRole: IdentityUserRole<string>
    {
        public virtual DbUser User { get; set; }
        public virtual DbRole Role { get; set; }
    }
}
