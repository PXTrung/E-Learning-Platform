using E_LearningApi.DTOs.Auth;

namespace E_LearningApi.Services.Auth.Register
{
    public interface IRegisterService
    {
        Task Register(RegisterRequest request, CancellationToken cancellationToken);
    }
}
