using E_LearningApi.Attributes;
using E_LearningApi.Common;
using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.Course
{
    public class UpdateCourseRequest
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [StringLength(Constants.MAXLENGTH_NAME, ErrorMessage = "The Course's name must not exceed 100 characters")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(1000, ErrorMessage = "The Course's name must not exceed 1000 characters")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Price is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be a positive value.")]
        public double Price { get; set; }

        [AllowedExtensions(new string[] { ".jpg", ".jpeg", ".png" }, ErrorMessage = "Only image files (jpg, jpeg, png) are allowed.")]
        public IFormFile? ThumbnailFile { get; set; }

        [Required(ErrorMessage = "Level is required.")]
        public string Level { get; set; }

        [Required(ErrorMessage = "CategoryId is required.")]
        [NonEmptyGuid(ErrorMessage = "CategoryId must be a non-empty GUID.")]
        public Guid CategoryId { get; set; }
    }
}
