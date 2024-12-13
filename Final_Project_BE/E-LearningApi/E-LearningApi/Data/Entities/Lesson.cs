namespace E_LearningApi.Data.Entities
{
    public class Lesson
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
        public Guid? VideoId { get; set; }
        public virtual Media? Video { get; set; }

        public Guid? SessionId { get; set; }
        public virtual Session? Session { get; set; }
        public TimeSpan Duration { get; set; }

        public DateTime CreatedAt { get; init; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
