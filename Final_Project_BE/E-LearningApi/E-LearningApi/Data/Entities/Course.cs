using E_LearningApi.Common.Enums;
using System.Collections.ObjectModel;

namespace E_LearningApi.Data.Entities
{
    public class Course
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public double Price { get; set; }

        public Levels Level {  get; set; }

        public Guid? CategoryId { get; set; }
        public virtual Category? Category { get; set; } 

        public Guid? ThumbnailId { get; set; }
        public virtual Media? Thumbnail { get; set; } 

        public ICollection<Session> Sessions { get; set; } = new Collection<Session>();

        // One course can appear in many order items
        public ICollection<OrderItem> OrderItems { get; set; } = new Collection<OrderItem>();

        // One course can have many enrollments
        public ICollection<Enrollment> Enrollments { get; set; } = new Collection<Enrollment>();

        public ICollection<Rating> Ratings { get; set; } = new Collection<Rating>();

        public DateTime CreatedAt { get; init; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
