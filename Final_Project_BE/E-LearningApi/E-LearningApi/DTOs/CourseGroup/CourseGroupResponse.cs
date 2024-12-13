using E_LearningApi.DTOs.Enrollment;

namespace E_LearningApi.DTOs.CourseGroup
{
    public class CourseGroupResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<EnrollmentResponse> Enrollments { get; set; }
    }
}
