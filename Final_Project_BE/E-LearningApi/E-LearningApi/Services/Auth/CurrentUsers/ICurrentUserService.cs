using E_LearningApi.Common;

namespace E_LearningApi.Services.Auth.CurrentUsers
{
    public interface ICurrentUserService
    {
        CurrentUser? GetCurrentUser();

        bool CheckIfCurrentUserExist();
    }
}
