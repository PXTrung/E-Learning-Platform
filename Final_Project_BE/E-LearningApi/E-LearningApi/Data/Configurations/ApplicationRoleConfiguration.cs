using E_LearningApi.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_LearningApi.Data.Configurations
{
    public class ApplicationRoleConfiguration : IEntityTypeConfiguration<ApplicationRole>
    {
        public void Configure(EntityTypeBuilder<ApplicationRole> builder)
        {
            builder.HasData(new Entities.ApplicationRole
            {
                Id = Guid.Parse("15aad953-7097-49b5-824f-d217e6c803b0"),
                Name = "User",
                NormalizedName = "USER"
            });

            builder.HasData(new Entities.ApplicationRole
            {
                Id = Guid.Parse("48d67a9a-4b11-4652-bfca-785d8fcf1597"),
                Name = "Admin",
                NormalizedName = "ADMIN"
            });
        }
    }
}
