using E_LearningApi.Attributes;
using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.Auth
{
    public class UpdateProfileRequest
    {
        /// <example>Trung</example>
        [StringLength(50, ErrorMessage = "First Name cannot exceed 50 characters.")]
        public string? FirstName { get; set; }

        /// <example>Pham</example>
        [StringLength(50, ErrorMessage = "Last Name cannot exceed 50 characters.")]
        public string? LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string? PhoneNumber { get; set; }

        [AllowedExtensions([".jpg", ".jpeg", ".png"], ErrorMessage = "Only image files (jpg, jpeg, png) are allowed.")]
        public IFormFile? AvatarFile { get; set; }

        [AllowedExtensions([".jpg", ".jpeg", ".png"], ErrorMessage = "Only image files (jpg, jpeg, png) are allowed.")]
        public IFormFile? BackgroundFile { get; set; }
    }
}
