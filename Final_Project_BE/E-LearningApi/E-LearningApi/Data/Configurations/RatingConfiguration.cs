using E_LearningApi.Common;
using E_LearningApi.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_LearningApi.Data.Configurations
{
    public class RatingConfiguration : IEntityTypeConfiguration<Rating>
    {
        public void Configure(EntityTypeBuilder<Rating> builder)
        {

            builder.Property(p => p.Review)
                .IsRequired()
                .HasMaxLength(Constants.MAXLENGTH_DESCRIPTION);

            builder.HasOne(r => r.User)
            .WithMany(u => u.Ratings)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(r => r.Course)
                .WithMany(c => c.Ratings) // Assuming Course entity has a Ratings collection
                .HasForeignKey(r => r.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
