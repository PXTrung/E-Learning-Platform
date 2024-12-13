namespace E_LearningApi.DTOs.Order
{
    public class OrderListResponse
    {
        public DateTime OrderDate { get; set; }
        public decimal TotalPrice { get; set; }

        public List<OrderItemDto> OrderItems { get; set; }
    }
}
