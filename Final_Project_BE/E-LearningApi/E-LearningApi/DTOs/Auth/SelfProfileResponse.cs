using E_LearningApi.Attributes;
using System.ComponentModel.DataAnnotations;

namespace E_LearningApi.DTOs.Auth
{
    public class SelfProfileResponse
    {

        public string Email { get; set; } = string.Empty;

        public string FullName { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty ;

        public string LastName { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }

        public string PhoneNumber {  get; set; } = string.Empty;

        public string AvatarUrl { get; set; } = string.Empty;
        
        public string BackgroundUrl { get; set; } = string.Empty;
    }
}
