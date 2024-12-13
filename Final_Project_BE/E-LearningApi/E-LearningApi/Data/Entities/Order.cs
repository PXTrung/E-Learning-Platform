using System.Collections.ObjectModel;

namespace E_LearningApi.Data.Entities
{
    public class Order
    {
        public Guid Id { get; set; } // Order ID
        public Guid? UserId { get; set; } // User who placed the order
        public ApplicationUser? User { get; set; } // Navigation property to the ApplicationUser

        public decimal TotalPrice { get; set; } // Total price of the order
        public DateTime OrderDate { get; set; } // Date when the order was placed

        public ICollection<OrderItem> OrderItems { get; set; } = new Collection<OrderItem>(); // Collection of OrderItems 
    
    }
}
