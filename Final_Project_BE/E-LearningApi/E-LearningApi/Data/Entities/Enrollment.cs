namespace E_LearningApi.Data.Entities
{
    public class Enrollment
    {
        public Guid Id { get; init; } = Guid.NewGuid();

        // Relationship to User
        public Guid? UserId { get; set; }
        public ApplicationUser? User { get; set; }

        // Relationship to Course
        public Guid? CourseId { get; set; }
        public Course? Course { get; set; }

        // Relationship to CourseGroup
        public Guid? CourseGroupId { get; set; }
        public CourseGroup? Group { get; set; }

        public bool? IsCourseInGroup { get; set; } = false;

        public int CompletedLessons { get; set; }

        public DateTime EnrolledAt { get; set; }

    }
}
