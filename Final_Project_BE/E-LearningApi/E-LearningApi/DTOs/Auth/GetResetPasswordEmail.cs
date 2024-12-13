using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.Auth
{
    public class GetResetPasswordEmail
    {
        /// <example>user@example.com</example>
        [Required]
        [EmailAddress(ErrorMessage = "The email is invalid")]
        public string Email { get; set; } = string.Empty;
    }
}
