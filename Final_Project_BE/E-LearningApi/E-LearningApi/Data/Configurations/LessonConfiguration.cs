using E_LearningApi.Common;
using E_LearningApi.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_LearningApi.Data.Configurations
{
    public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
    {
        public void Configure(EntityTypeBuilder<Lesson> builder)
        {
            builder.Property(s => s.Name)
                .HasMaxLength(Constants.MAXLENGTH_NAME)
                .IsRequired();
            
            builder.Property(s => s.Description)
                .HasMaxLength(1000)
                .IsRequired();

            builder.HasOne(c => c.Video)
                .WithOne()
                .HasForeignKey<Lesson>(c => c.VideoId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(s => s.Session)
            .WithMany(c => c.Lessions)
            .HasForeignKey(s => s.SessionId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
