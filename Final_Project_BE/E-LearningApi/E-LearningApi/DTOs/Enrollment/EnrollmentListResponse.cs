using E_LearningApi.DTOs.Course;

namespace E_LearningApi.DTOs.Enrollment
{
    public class EnrollmentListResponse
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public CourseDto Course { get; set; } // Adding full course information here
        public bool? IsCourseInGroup { get; set; }
    }
}
