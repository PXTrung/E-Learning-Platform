namespace E_LearningApi.DTOs.Rating
{
    public class RatingResponse
    {
        public Guid Id { get; set; }
        public int Star { get; set; } // Whole number rating input
        public string Review { get; set; }
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
    }
}
