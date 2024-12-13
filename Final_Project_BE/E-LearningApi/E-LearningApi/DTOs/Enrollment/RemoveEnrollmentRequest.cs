using E_LearningApi.Attributes;
using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.Enrollment
{
    public class RemoveEnrollmentRequest
    {
        [Required(ErrorMessage = "CourseGroupId is required.")]
        [NonEmptyGuid(ErrorMessage = "CourseGroupId must be a non-empty GUID.")]
        public Guid courseGroupId { get; set; }


        [Required(ErrorMessage = "EnrollmentId is required.")]
        [NonEmptyGuid(ErrorMessage = "EnrollmentId must be a non-empty GUID.")]
        public Guid enrollmentId { get; set; }
    }
}
