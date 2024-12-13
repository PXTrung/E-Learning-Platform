namespace E_LearningApi.Data.Entities
{
    public class Cart
    {
        public Guid Id { get; init; } = Guid.NewGuid(); // Cart ID
        public Guid? UserId { get; set; } // User who owns the cart
        public ApplicationUser? User { get; set; } // Navigation property to the ApplicationUser

        public decimal Total { get; set; } // Total price of the order

        public ICollection<CartItem>? CartItems { get; set; } // Collection of CartItems
    }
}
