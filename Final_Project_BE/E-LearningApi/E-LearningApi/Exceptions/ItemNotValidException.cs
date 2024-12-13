namespace E_LearningApi.Exceptions
{
    public class ItemNotValidException : ArgumentNullException
    {
        public ItemNotValidException(string message) : base(string.Empty, message)
        {
            
        }
    }
}
