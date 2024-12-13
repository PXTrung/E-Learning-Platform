namespace E_LearningApi.DTOs.Rating
{
    public class CreateRatingRequest
    {
        public int Star {  get; set; }
        public string Review { get; set; }

        public Guid CourseId { get; set; }
    }
}
