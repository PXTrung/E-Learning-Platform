using E_LearningApi.Data.Entities;

namespace E_LearningApi.DTOs.Rating
{
    public class RatingListResponse
    {
        public Guid Id { get; set; } 
        public int Star { get; set; } // Whole number rating input
        public string Review { get; set; }

        public bool IsEdit { get; set; }
        public UserDto User { get; set; }

    }
}
