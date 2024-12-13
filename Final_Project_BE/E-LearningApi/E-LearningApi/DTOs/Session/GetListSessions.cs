namespace E_LearningApi.DTOs.Session
{
    public class GetListSessions
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
