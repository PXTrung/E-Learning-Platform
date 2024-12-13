using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Order;

namespace E_LearningApi.Services.Orders
{
    public interface IOrderService
    {
        Task CreateOrderAsync(Guid userId, decimal totalPrice, List<CartItem> cartItems);

        Task<IQueryable<OrderListResponse>> GetAllAsync();
    }
}
