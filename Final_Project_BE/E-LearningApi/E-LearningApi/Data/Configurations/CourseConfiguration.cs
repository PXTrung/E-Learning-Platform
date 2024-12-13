using E_LearningApi.Common;
using E_LearningApi.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace E_LearningApi.Data.Configurations
{
    public class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.Property(c => c.Name)
                .HasMaxLength(Constants.MAXLENGTH_NAME)
                .IsRequired();

            builder.Property(c => c.Description)
                .HasMaxLength(1000)
                .IsRequired();

            builder.HasOne(c => c.Category)
                .WithMany(c => c.Courses)
                .HasForeignKey(c => c.CategoryId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(c => c.Thumbnail)
                .WithOne()
                .HasForeignKey<Course>(c => c.ThumbnailId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
