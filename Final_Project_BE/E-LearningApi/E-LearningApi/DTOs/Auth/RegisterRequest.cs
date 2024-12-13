using E_LearningApi.Attributes;
using E_LearningApi.Common;
using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.Auth
{
    public class RegisterRequest
    {

        /// <example>user@example.com</example>
        [Required]
        [EmailAddress(ErrorMessage = "The email is invalid")]
        public string Email { get; set; } = string.Empty;

        /// <example>Abcd@1234</example>
        [Required]
        [PasswordComplexity]
        public string Password { get; set; } = string.Empty;

        /// <example>Abcd@1234</example>
        [Required]
        [ComparePassword("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;

        /// <example>Trung</example>
        [Required]
        [MaxLength(Constants.MAXLENGTH_AUTH_NAME, ErrorMessage = "The name must not exceed 50 characters")]
        public string FirstName { get; set; } = string.Empty;

        /// <example>Pham</example>
        [Required]
        [MaxLength(Constants.MAXLENGTH_AUTH_NAME, ErrorMessage = "The name must not exceed 50 characters")]
        public string LastName { get; set; } = string.Empty;

    }
}
