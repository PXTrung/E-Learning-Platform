namespace E_LearningApi.DTOs.CartItem
{
    public class CartItemDto
    {
        public Guid CourseId { get; set; }
        public string CourseName { get; set; }

        public string CourseThumbnail {  get; set; }
        public double Price { get; set; }
    }
}
