using System.Collections.ObjectModel;

namespace E_LearningApi.Data.Entities
{
    public class Session
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;    
        public Guid? CourseId { get; set; }
        public virtual Course? Course { get; set; }

        public ICollection<Lesson> Lessions { get; set; } = new Collection<Lesson>();

        public DateTime CreatedAt { get; init; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
