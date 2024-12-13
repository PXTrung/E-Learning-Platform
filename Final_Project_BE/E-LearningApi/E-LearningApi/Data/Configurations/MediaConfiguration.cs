using E_LearningApi.Common;
using E_LearningApi.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_LearningApi.Data.Configurations
{
    public class MediaConfiguration : IEntityTypeConfiguration<Media>
    {
        public void Configure(EntityTypeBuilder<Media> builder)
        {
            builder.Property(m => m.Name)
                .HasMaxLength(Constants.MAXLENGTH_NAME)
                .IsRequired();

            builder.Property(m => m.FileName)
                .HasMaxLength(Constants.MAXLENGTH_NAME)
                .IsRequired();

            builder.Property(m => m.Extension)
                .HasMaxLength(7) 
                .IsRequired();

            builder.Property(m => m.UrlFilePath)
                .HasMaxLength(Constants.MAXLENGTH_PATH_NAME);

            builder.Property(m => m.LocalFilePath)
                .HasMaxLength (Constants.MAXLENGTH_PATH_NAME);

        }
    }
}
