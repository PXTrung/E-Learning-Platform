namespace E_LearningApi.Exceptions
{
    public sealed class ItemNotFoundException : NotFoundException
    {
        public ItemNotFoundException(string message) : base(message) { }
    }
}
