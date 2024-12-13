using E_LearningApi.Attributes;
using E_LearningApi.Common;
using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.Lesson
{
    public class UpdateLessonRequest
    {
        [Required]
        [StringLength(Constants.MAXLENGTH_NAME, ErrorMessage = "The Course's name must not exceed 100 characters")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(1000, ErrorMessage = "The Course's name must not exceed 1000 characters")]
        public string Description { get; set; } = string.Empty;

        [AllowedExtensions([".mkv", ".mov", ".mp4"], ErrorMessage = "Only video files (mkv, mov, mp4) are allowed.")]
        public IFormFile? VideoFile { get; set; }
    }
}
