using E_LearningApi.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace E_LearningApi.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

            //Ensuring the database created
            await context.Database.EnsureCreatedAsync();

            // Check if roles table have any data
            if (!context.Roles.Any())
            {
                // Seeding Roles
                var roles = new List<string> { "Admin", "User" };
                foreach (var roleName in roles)
                {
                    await roleManager.CreateAsync(new ApplicationRole { Name = roleName });
                }

                await context.SaveChangesAsync();
            }

            // Check if users table have any data
            if (!context.Users.Any())
            {
                // Create Admin account
                var admin = new ApplicationUser
                {
                    UserName = "admin@gmail.com",
                    Email = "admin@gmail.com",
                    FirstName = "Admin",
                    LastName = "Super",
                };

                // Create Manager account
                var student = new ApplicationUser
                {
                    UserName = "PXTrung@gmail.com",
                    Email = "PXTrung@gmail.com",
                    FirstName = "PX",
                    LastName = "Trung",
                };

                await userManager.CreateAsync(admin, "Abcd@1234");
                await userManager.AddToRoleAsync(admin, "Admin");

                await userManager.CreateAsync(student, "Abcd@1234");
                await userManager.AddToRoleAsync(student, "User");

                await context.SaveChangesAsync();
            }

            if(!context.Categories.Any())
            {
                var categories = new List<string> { "Front-End", "Back-End" };
                foreach (var category in categories)
                {
                    var categoryEntity = new Category
                    {
                        Name = category,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                    };
                    await context.Categories.AddAsync(categoryEntity);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
