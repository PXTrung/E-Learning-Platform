using E_LearningApi.Data;
using E_LearningApi.Data.Entities;
using E_LearningApi.Exceptions.Auth;
using E_LearningApi.Services.Auth.CurrentUsers;
using E_LearningApi.Services.Orders;
using E_LearningApi.Services.Stripe;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace E_LearningApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IStripeService _stripeService;
        private readonly IOrderService _orderService;
        private readonly ApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public PaymentsController(IStripeService stripeService, IOrderService orderService, ApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _stripeService = stripeService;
            _orderService = orderService;
            _context = context;
            _currentUserService = currentUserService;
        }

        [HttpPost("create-payment-intent")]
        public async Task<IActionResult> CreatePaymentIntent()
        {

            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var cart = await _context.Carts.Include(c => c.CartItems)
                                          .ThenInclude(ci => ci.Course)
                                          .SingleOrDefaultAsync(c => c.UserId == currentUser.Id);

            if (cart == null || cart.CartItems.Count == 0)
            {
                return BadRequest("Cart is empty");
            }

            var paymentIntent = await _stripeService.CreatePaymentIntent(cart.Total);

            return Ok(new { clientSecret = paymentIntent.ClientSecret });
        }

        [HttpPost("confirm-order")]
        public async Task<IActionResult> ConfirmOrder()
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var cart = await _context.Carts.Include(c => c.CartItems)
                                          .ThenInclude(ci => ci.Course)
                                          .FirstOrDefaultAsync(c => c.UserId == currentUser.Id);

            if (cart == null || !cart.CartItems.Any())
            {
                return BadRequest("Cart is empty");
            }

            await _orderService.CreateOrderAsync(currentUser.Id, cart.Total, cart.CartItems.ToList());

            // Add the courses from the cart to enrollments
            var enrollments = cart.CartItems.Select(cartItem => new Enrollment
            {
                UserId = currentUser.Id,
                CourseId = cartItem.CourseId,
                CompletedLessons = 0, 
                EnrolledAt = DateTime.Now
            }).ToList();

            // Add enrollments to the database
            _context.Enrollments.AddRange(enrollments);

            // Clear the user's cart after successful order creation
            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Your payment is successfully" });
        }
    }
}
