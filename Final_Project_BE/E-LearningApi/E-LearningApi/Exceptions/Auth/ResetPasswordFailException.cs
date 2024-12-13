namespace E_LearningApi.Exceptions.Auth
{
    public class ResetPasswordFailException : AuthenticationException
    {
        public ResetPasswordFailException(string message) : base(message) { }
    }
}
