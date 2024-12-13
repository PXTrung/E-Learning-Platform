using System.Collections.ObjectModel;

namespace E_LearningApi.Data.Entities
{
    public class CourseGroup
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;

        // Relationship to User
        public Guid? UserId { get; set; }
        public ApplicationUser? User { get; set; }

        public ICollection<Enrollment> Enrollments { get; set; } = new Collection<Enrollment>();
    }
}
