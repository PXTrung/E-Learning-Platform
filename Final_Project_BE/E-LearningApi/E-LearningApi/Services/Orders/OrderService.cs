using E_LearningApi.Data.Entities;
using E_LearningApi.Data;
using AutoMapper;
using E_LearningApi.Services.Auth.CurrentUsers;
using E_LearningApi.DTOs.CourseGroup;
using E_LearningApi.Exceptions.Auth;
using Microsoft.EntityFrameworkCore;
using E_LearningApi.DTOs.Order;

namespace E_LearningApi.Services.Orders
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public OrderService(ApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task CreateOrderAsync(Guid userId, decimal totalPrice, List<CartItem> cartItems)
        {
            var order = new Order
            {
                UserId = userId,
                TotalPrice = totalPrice,
                OrderDate = DateTime.Now,
            };

            order.OrderItems = cartItems.Select(ci => new OrderItem
            {
                OrderId = order.Id,
                CourseId = ci.CourseId,
                Price = (decimal)ci.Course.Price
            }).ToList();

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
        }

        public Task<IQueryable<OrderListResponse>> GetAllAsync()
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var orders = _context.Orders.Include(cg => cg.OrderItems)
                .ThenInclude(e => e.Course).Where(c => c.UserId == currentUser.Id).AsNoTracking();
            var ordersDto = _mapper.ProjectTo<OrderListResponse>(orders);
            return Task.FromResult(ordersDto);
        }
    }
}
