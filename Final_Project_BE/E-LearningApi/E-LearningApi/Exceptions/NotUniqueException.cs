namespace E_LearningApi.Exceptions
{
    public abstract class NotUniqueException : Exception
    {
        public NotUniqueException(string message) : base(message) { }
    }
}
