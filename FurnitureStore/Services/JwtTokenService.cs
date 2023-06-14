using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FurnitureStore.Data.Entities.AppUser;

namespace FurnitureStore.Services
{
    public interface IJwtTokenService
    {
        string CreateToken(DbUser user);
        string CreateRefreshToken(DbUser user);
    }
    public class JwtTokenService : IJwtTokenService
    {
        private readonly UserManager<DbUser> _userManager;
        public JwtTokenService(UserManager<DbUser> userManager)
        {
            _userManager = userManager;
        }
        public string CreateToken(DbUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            roles = roles.OrderBy(x => x).ToList();
            List<Claim> claims = new List<Claim>()
            {
                new Claim("id",user.Id),
                new Claim("name",user.Name+" "+user.LastName)
            };
            foreach (var el in roles)
            {
                claims.Add(new Claim("roles", el));
            }

            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("hello-kitty-secret-key"));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddDays(1),
                claims: claims
                );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
        public string CreateRefreshToken(DbUser user)
        {
            var claims = new List<Claim>
        {
            new Claim("id", user.Id),
            new Claim("name", user.Name + " " + user.LastName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("hello-kitty-secret-key"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signingCredentials,
                expires: DateTime.Now.AddDays(1),
                claims: claims
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
