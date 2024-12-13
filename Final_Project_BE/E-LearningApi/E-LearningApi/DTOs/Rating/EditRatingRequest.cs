namespace E_LearningApi.DTOs.Rating
{
    public class EditRatingRequest
    {
        public Guid Id { get; set; }
        public int Star { get; set; }
        public string Review { get; set; }
    }
}
