namespace E_LearningApi.DTOs.Auth
{
    public class GetListUsers
    {
        public string Email { get; set; } = string.Empty;

        public string FullName { get; set; } = string.Empty;

        public string? PhoneNumber {  get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string? AvatarUrl { get; set; }

        public string Role { get; set; } = string.Empty;

    }
}
