using AutoMapper;
using E_LearningApi.Data.Entities;
using E_LearningApi.Data;
using E_LearningApi.DTOs.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using E_LearningApi.Exceptions;

namespace E_LearningApi.Services.Auth.Register
{
    public class RegisterService : IRegisterService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public RegisterService(UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }


        public async Task Register(RegisterRequest request, CancellationToken cancellationToken)
        {
            //Check if email and password exist
            var isEmailExist = await _userManager.Users.AnyAsync(u => u.NormalizedEmail == request.Email.ToUpperInvariant(), cancellationToken);

            if(isEmailExist)
            {
                throw new ItemNotUniqueException(request.Email);
            }

            // Map request to entity
            var newUser = _mapper.Map<ApplicationUser>(request);


            var result = await _userManager.CreateAsync(newUser, request.Password);

            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Something went wrong, please try register again");
            }

            //Add "Contributor" as default role for new user
            await _userManager.AddToRoleAsync(newUser, "User");
        }
    }
}
