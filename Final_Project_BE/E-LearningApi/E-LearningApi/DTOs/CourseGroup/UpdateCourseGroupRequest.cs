using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.CourseGroup
{
    public class UpdateCourseGroupRequest
    {
        [Required]
        [StringLength(40, ErrorMessage = "The CourseGroup's name must not exceed 40 characters")]
        public string Name { get; set; }
    }
}
