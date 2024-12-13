using E_LearningApi.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_LearningApi.Data.Configurations
{
    public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
    {
        public void Configure(EntityTypeBuilder<CartItem> builder)
        {
            builder.HasOne(s => s.Cart)
            .WithMany(c => c.CartItems)
            .HasForeignKey(s => s.CartId)
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete when Cart is deleted
        }
        
    }
}
