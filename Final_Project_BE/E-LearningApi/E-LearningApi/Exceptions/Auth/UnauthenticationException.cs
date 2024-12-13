namespace E_LearningApi.Exceptions.Auth
{
    public class UnauthenticationException : AuthenticationException
    {
        public UnauthenticationException(string message) : base(message) { }
    }
}
