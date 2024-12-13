namespace E_LearningApi.Data.Entities
{
    public class CartItem
    {
        public Guid Id { get; init; } = Guid.NewGuid(); // CartItem ID
        public Guid? CartId { get; set; } // Reference to the cart
        public Cart? Cart { get; set; } // Navigation property to the Cart

        public Guid? CourseId { get; set; } // Reference to the course being added to the cart
        public Course? Course { get; set; } // Navigation property to the Course

    }
}
