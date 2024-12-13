using E_LearningApi.Attributes;
using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.Auth
{
    public class ResetPasswordRequest
    {
        /// <example>Abcd@1234</example>
        [Required]
        [PasswordComplexity]
        public string Password { get; set; } = string.Empty;

        /// <example>Abcd@1234</example>
        [Required]
        [ComparePassword("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
