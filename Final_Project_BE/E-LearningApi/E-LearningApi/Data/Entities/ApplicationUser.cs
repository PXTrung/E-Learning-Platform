using Microsoft.AspNetCore.Identity;
using System.Collections.ObjectModel;

namespace E_LearningApi.Data.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;

        public DateTime? DateOfBirth { get; set; }

        public ICollection<ApplicationRole> Roles { get; set; } = new Collection<ApplicationRole>();

        // One user can have many orders
        public ICollection<Order> Orders { get; set; } = new Collection<Order>();

        // One user can enroll to many courses
        public ICollection<Enrollment> Enrollments { get; set; } = new Collection<Enrollment>();

        public ICollection<Rating> Ratings { get; set; } = new Collection<Rating>();

        public Guid? AvatarId { get; set; }

        public Media? Avatar { get; set; }

        public Guid? BackgroundId { get; set; }

        public Media? Background { get; set; }
    }
}
