using System.Collections.ObjectModel;

namespace E_LearningApi.Data.Entities
{
    public class Category
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;

        public virtual ICollection<Course> Courses { get; set; } = new Collection<Course>();
        public DateTime CreatedAt { get; init; } = DateTime.Now;
        public DateTime UpdatedAt { get; set;} = DateTime.Now;
    }
}
