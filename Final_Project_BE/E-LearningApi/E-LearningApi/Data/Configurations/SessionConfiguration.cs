using E_LearningApi.Common;
using E_LearningApi.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_LearningApi.Data.Configurations
{
    public class SessionConfiguration : IEntityTypeConfiguration<Session>
    {
        public void Configure(EntityTypeBuilder<Session> builder)
        {
            builder.Property(s => s.Name)
                .HasMaxLength(Constants.MAXLENGTH_NAME)
                .IsRequired();

            builder.HasOne(s => s.Course)
            .WithMany(c => c.Sessions)
            .HasForeignKey(s => s.CourseId)
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Course is deleted
        }
    }
}
