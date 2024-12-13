using E_LearningApi.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_LearningApi.Data.Configurations
{
    public class CourseGroupConfiguration : IEntityTypeConfiguration<CourseGroup>
    {
        public void Configure(EntityTypeBuilder<CourseGroup> builder)
        {
            builder.Property(c => c.Name)
                .HasMaxLength(40)
                .IsRequired();
        }
    }
}
