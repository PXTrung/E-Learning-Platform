using E_LearningApi.DTOs.Auth;

namespace E_LearningApi.Services.Auth.Login
{
    public interface ILoginService
    {
        Task<string> Login(LoginRequest loginRequest);
    }
}
