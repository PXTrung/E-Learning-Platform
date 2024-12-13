namespace E_LearningApi.Exceptions
{
    public sealed class ItemNotUniqueException : NotUniqueException
    {
        public ItemNotUniqueException(string name) : base($"{name} is already existed")
        {
            
        }
    }
}
