using E_LearningApi.Common;
using System.ComponentModel.DataAnnotations;
namespace E_LearningApi.DTOs.Session
{
    public class GetSessionResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
