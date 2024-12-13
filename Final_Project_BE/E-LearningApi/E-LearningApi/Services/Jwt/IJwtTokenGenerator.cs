namespace E_LearningApi.Services.Jwt
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(
       Guid id,
       string email,
       string firstName,
       string lastName,
       List<string> roles);
    }
}
