using AutoMapper;
using E_LearningApi.Data;
using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Auth;
using E_LearningApi.Exceptions;
using E_LearningApi.Exceptions.Auth;
using E_LearningApi.Services.Emails;
using E_LearningApi.Services.Files;
using Hangfire;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace E_LearningApi.Services.Auth.CurrentUsers
{
    public class ProfileService : IProfileService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IFileService _fileService;
        private readonly IEmailService _emailService;
        private readonly IBackgroundJobClient _backgroundJobClient;

        public ProfileService(ApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService, IFileService fileService, UserManager<ApplicationUser> userManager, IEmailService emailService, IBackgroundJobClient backgroundJobClient) 
        {
            _fileService = fileService;
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
            _userManager = userManager;
            _emailService = emailService;
            _backgroundJobClient = backgroundJobClient;
        }

        public async Task<SelfProfileResponse> GetProfile(CancellationToken cancellationToken)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }
            var userInfo = await _context.Users
                .Include(u => u.Roles)
                .Include(u => u.Avatar)
                .Include(u => u.Background)
                .FirstOrDefaultAsync(u => u.Email == currentUser.Email, cancellationToken);
            if (userInfo == null)
            {
                throw new InvalidTokenException("Invalid token information");
            }
            return _mapper.Map<SelfProfileResponse>(userInfo);
        }

        public Task<IQueryable<GetListUsers>> GetAllAsync()
        {
            var users = _context.Users.AsNoTracking();

            var usersDto = _mapper.ProjectTo<GetListUsers>(users);

            return Task.FromResult(usersDto);
        }

        public async Task UpdateProfile(UpdateProfileRequest request, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }
            var user = await _context.Users.Include(u => u.Avatar).Include(u => u.Background).SingleOrDefaultAsync(c => c.Id.Equals(currentUser.Id));  

            if (user == null)
            {
                throw new ItemNotFoundException("User not found");
            }

            var updatedUser = _mapper.Map(request, user);


            if (request.AvatarFile != null)
            {
                if (user.AvatarId == null)
                {
                    var avatarEntity = await _fileService.SaveFileAync(request.AvatarFile, "avatar");
                    await _context.AddAsync(avatarEntity);

                    updatedUser.AvatarId = avatarEntity.Id;
                }
                else
                {
                    await _fileService.UpdateFileAsync(request.AvatarFile, "avatar", user.Avatar);
                }
            }

            if(request.BackgroundFile != null)
            {
                if (user.BackgroundId == null)
                {
                    var backgroundEntity = await _fileService.SaveFileAync(request.BackgroundFile, "background");
                    await _context.AddAsync(backgroundEntity);

                    updatedUser.BackgroundId = backgroundEntity.Id;
                }
                else
                {
                    await _fileService.UpdateFileAsync(request.BackgroundFile, "background", user.Background);
                }
            }

            await _context.SaveChangesAsync(cancellationToken);

        }

        public async Task GetEmailToResetPassword(GetResetPasswordEmail request)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var user = await _userManager.FindByEmailAsync(currentUser.Email);

            var otp = await _userManager.GenerateUserTokenAsync(user, TokenOptions.DefaultPhoneProvider, "ResetPasswordPurpose");


            _backgroundJobClient.Enqueue(() => _emailService.SendEmail(request.Email,
                "Password Reset OTP from CourseHub",
                $"Please enter the following OTP to reset your password: <strong>{otp}</strong>"));
        }

        public async Task VerifyOTP(OTPRequest request)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var user = await _userManager.FindByEmailAsync(currentUser.Email);

            var otpVerified = await _userManager.VerifyUserTokenAsync(user, TokenOptions.DefaultPhoneProvider,
               "ResetPasswordPurpose", request.OTP);

            if (!otpVerified)
            {
                throw new InvalidTokenException("OTP is invalid");
            }

        }

        public async Task ResetPassword(ResetPasswordRequest request)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var user = await _userManager.FindByEmailAsync(currentUser.Email);

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            await _userManager.ResetPasswordAsync(user, token, request.Password);
        }

    }
}
