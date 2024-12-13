using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Auth;
using E_LearningApi.Exceptions;
using E_LearningApi.Services.Jwt;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

namespace E_LearningApi.Services.Auth.Login
{
    public class LoginService : ILoginService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public LoginService(UserManager<ApplicationUser> userManager, IJwtTokenGenerator jwtTokenGenerator)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _userManager = userManager;
        }
        public async Task<String> Login(LoginRequest loginRequest)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);

            if (user == null)
            {
                throw new ItemNotFoundException("Password or Email wrong");
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginRequest.Password);

            if (!isPasswordValid)
            {
                throw new ItemNotFoundException("Password or Email wrong");
            }

            var roles = await _userManager.GetRolesAsync(user);

            var token = _jwtTokenGenerator.GenerateToken(
                id: user.Id,
                email: user.Email,
                roles: roles.ToList(),
                firstName: user.FirstName,
                lastName: user.LastName
                );

             return token;
        }
    }
}
