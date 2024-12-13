namespace E_LearningApi.Exceptions.Auth
{
    public class InvalidTokenException : AuthenticationException
    {
        public InvalidTokenException(string message) : base(message) { }    
    }
}
