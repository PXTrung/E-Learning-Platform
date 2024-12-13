namespace E_LearningApi.Data.Entities
{
    public class OrderItem
    {
        public Guid Id { get; init; } = Guid.NewGuid(); // OrderItem ID
        public Guid? OrderId { get; set; } // Reference to the order
        public Order? Order { get; set; } // Navigation property to the Order

        public Guid? CourseId { get; set; } // Reference to the purchased course
        public Course? Course { get; set; } // Navigation property to the Course

        public decimal Price { get; set; } // Price of the course at the time of purchase
    }
}
