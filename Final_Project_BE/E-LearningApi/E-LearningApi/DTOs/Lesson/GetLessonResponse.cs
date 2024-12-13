namespace E_LearningApi.DTOs.Lesson
{
    public class GetLessonResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string VideoUrl { get; set; }

        public string Session {  get; set; }
        public string SessionId { get; set; }

        public TimeSpan Duration { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
