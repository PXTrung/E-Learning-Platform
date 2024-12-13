using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Auth;
using E_LearningApi.Services.Auth.CurrentUsers;
using E_LearningApi.Services.Auth.Login;
using E_LearningApi.Services.Auth.Register;
using E_LearningApi.Sieve;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Sieve.Services;

namespace E_LearningApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILoginService _loginService;
        private readonly IRegisterService _registerService;
        private readonly IProfileService _profileService;
        private readonly ISieveProcessor _sieveProcessor;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthController(IRegisterService registerService, ILoginService loginService, IProfileService profileService, ISieveProcessor sieveProcessor, IHttpContextAccessor httpContextAccessor)
        {
            _loginService = loginService;
            _registerService = registerService;
            _profileService = profileService;
            _sieveProcessor = sieveProcessor;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        ///    Registering a new account
        /// </summary>
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request, CancellationToken cancellationToken)
        {
            await _registerService.Register(request, cancellationToken);

            return Ok(new { message = "Register successfully" });
        }

        /// <summary>
        ///   Login to get JWT
        /// </summary>
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _loginService.Login(request);

            return Ok(new { message = "Login Successfully", Data = token });
        }

        /// <summary>
        ///   Get profile of current user
        /// </summary>
        [HttpGet]
        [Route("Profile")]
        public async Task<IActionResult> GetProfile(CancellationToken cancellationToken)
        {
            var userProfile = await _profileService.GetProfile(cancellationToken);

            return Ok(userProfile);
        }

        [HttpPut]
        [Route("UpdateProfile")]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateProfileRequest request, CancellationToken cancellationToken)
        {
            await _profileService.UpdateProfile(request, cancellationToken);

            return Ok(new { message = "Update Profile Successfully" });
        }

        /// <summary>
        ///   Get All Users
        /// </summary>
        [HttpGet]
        [Route("AllUsers")]
        public async Task<IActionResult> GetAll([FromQuery] SieveModel sieveModel)
        {
            var users = await _profileService.GetAllAsync();

            return Ok(await users.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));
        }

        [HttpPost]
        [Route("SendEmailOTP")]
        public async Task<IActionResult> SendMailOTP(GetResetPasswordEmail request)
        {
            await _profileService.GetEmailToResetPassword(request);
            return Ok(new { message = "OTP is sent to the desired email" });
        }

        [HttpPost]
        [Route("ConfirmOTP")]
        public async Task<IActionResult> ConfirmOTP(OTPRequest request)
        {
            await _profileService.VerifyOTP(request);
            return Ok(new { message = "OTP is verified, you can change your password now" });
        }

        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
        {
            await _profileService.ResetPassword(request);
            return Ok(new {message = "Conragulation you successully reset the password"});
        }
    }
}
