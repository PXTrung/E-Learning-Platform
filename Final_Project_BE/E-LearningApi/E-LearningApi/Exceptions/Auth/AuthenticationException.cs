namespace E_LearningApi.Exceptions.Auth
{
    public class AuthenticationException : Exception
    {
        public AuthenticationException(string message) : base(message) { }
    }
}
