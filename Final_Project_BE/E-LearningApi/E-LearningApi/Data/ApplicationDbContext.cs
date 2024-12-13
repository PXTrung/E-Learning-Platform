using E_LearningApi.Data.Configurations;
using E_LearningApi.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace E_LearningApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Media> Media { get; set; } 

        public DbSet<Course> Courses { get; set; }

        public DbSet<Session> Sessions { get; set; }    

        public DbSet<Lesson> Lessons { get; set; }

        public DbSet<Cart> Carts { get; set; }

        public DbSet<CartItem> CartItems { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderItem> OrderItems { get; set; }

        public DbSet<Enrollment> Enrollments { get; set; }

        public DbSet<CourseGroup> courseGroups { get; set; }

        public DbSet<Rating> ratings { get; set; }

        public DbSet<ApplicationUser> Users { get; set; }

        public DbSet<ApplicationRole> Roles { get; set; }


        //Initialize connectionstring and connect to database
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Server=MSI\\SQLEXPRESS;Database=E-LearningApi;User Id=trung;Password=Abcd@12345!;TrustServerCertificate=True; Trusted_Connection=False; MultipleActiveResultSets=true";
            optionsBuilder.UseSqlServer(connectionString);
        }


        //Apply Model Configuration
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);


            // Configure many-to-many relationship between role and user
            // Configure the IdentityUserRole<Guid> to have one ApplicationUser with many IdentityUserRole<Guid> entries and specifies the foreign key (UserId) on IdentityUserRole<Guid>.
            // Configure the IdentityUserRole<Guid> to have one ApplicationRole with many IdentityUserRole<Guid> entries and specifies the foreign key (RoleId) on IdentityUserRole<Guid>
            // specify that the join table should be named "UserRoles" in the database
            builder.Entity<ApplicationUser>()
           .HasMany(u => u.Roles)
           .WithMany()
           .UsingEntity<IdentityUserRole<Guid>>(  
               j => j.HasOne<ApplicationRole>().WithMany().HasForeignKey(ur => ur.RoleId),
               j => j.HasOne<ApplicationUser>().WithMany().HasForeignKey(ur => ur.UserId),
               j =>
               {
                   j.ToTable("UserRoles");
               });
        }

      
    }
}
