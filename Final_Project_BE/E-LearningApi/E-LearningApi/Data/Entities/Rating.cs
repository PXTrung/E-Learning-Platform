namespace E_LearningApi.Data.Entities
{
    public class Rating
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public int Star { get; set; } // Whole number rating input
        public string Review { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid CourseId { get; set; }

        public Course Course { get; set; }

        public bool IsEdit { get; set; } = false;

        public DateTime CreatedAt { get; init; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
