using E_LearningApi.Common.Enums;

namespace E_LearningApi.DTOs.Course
{
    public class GetListCourses
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public Levels Level { get; set; }

        public string Category { get; set; }

        public string ThumbnailUrl { get; set; }

        public TimeSpan? TotalTime { get; set; }
        public int? NumberOfLessons { get; set; }
        public double? AverageRating { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
