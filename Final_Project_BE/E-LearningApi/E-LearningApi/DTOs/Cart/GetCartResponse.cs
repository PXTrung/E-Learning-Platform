using E_LearningApi.DTOs.CartItem;

namespace E_LearningApi.DTOs.Cart
{
    public class GetCartResponse
    {
        public Guid Id { get; set; }

        public decimal Total { get; set; }

        // New property to hold the count of cart items
        //public int ItemCount => CartItems.Count;
        public int ItemCount { get; set; }
        public List<CartItemDto> CartItems { get; set; } = new List<CartItemDto>();
    }
}
