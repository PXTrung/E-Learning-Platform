using E_LearningApi.Common.Enums;

namespace E_LearningApi.DTOs.Course
{
    public class CourseDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public Levels Level { get; set; }

        public string Category { get; set; }

        public string ThumbnailUrl { get; set; }
    }
}
