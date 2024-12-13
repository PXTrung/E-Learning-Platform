using E_LearningApi.DTOs.Auth;

namespace E_LearningApi.Services.Auth.CurrentUsers
{
    public interface IProfileService
    {
        Task<SelfProfileResponse> GetProfile(CancellationToken cancellationToken);
        Task<IQueryable<GetListUsers>> GetAllAsync();

        Task UpdateProfile(UpdateProfileRequest request, CancellationToken cancellationToken);

        Task GetEmailToResetPassword(GetResetPasswordEmail request);

        Task VerifyOTP(OTPRequest request);

        Task ResetPassword(ResetPasswordRequest request);
    }
}
