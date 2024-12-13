using E_LearningApi.Common;
using System.Security.Claims;

namespace E_LearningApi.Services.Auth.CurrentUsers
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public CurrentUserService(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public CurrentUser? GetCurrentUser()
        {
            if (!CheckIfCurrentUserExist()) return null; //

            var idClaim = GetSingleClaimValue("id");
            var id = idClaim != null && Guid.TryParse(idClaim, out var parsedId) ? parsedId : Guid.Empty;

            var roles = GetClaimValues(ClaimTypes.Role);
            var firstName = GetSingleClaimValue(ClaimTypes.GivenName) ?? string.Empty;
            var lastName = GetSingleClaimValue(ClaimTypes.Surname) ?? string.Empty;
            var email = GetSingleClaimValue(ClaimTypes.Email) ?? string.Empty;

            return new CurrentUser(id, firstName, lastName, email, roles);
        }

        public bool CheckIfCurrentUserExist()
        {
            return _contextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
        }

        private List<string> GetClaimValues(string claimType) =>
            _contextAccessor.HttpContext?.User?.Claims
                .Where(claim => claim.Type == claimType)
                .Select(claim => claim.Value)
                .ToList() ?? new List<string>();

        private string? GetSingleClaimValue(string claimType)
        {
            var claim = _contextAccessor.HttpContext?.User?.Claims.FirstOrDefault(claim => claim.Type == claimType);
            return claim?.Value;
        }
    }
}
