using E_LearningApi.Attributes;
using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.Auth
{
    public class LoginRequest
    {
        /// <example>userexample@gmail.com</example>
        [Required]
        [EmailAddress(ErrorMessage = "The email is invalid")]
        public string Email { get; set; } = string.Empty;


        /// <example>Abcd@1234</example>
        [Required]
        [PasswordComplexity]
        public string Password { get; set; } = string.Empty.ToString();
    }
}
