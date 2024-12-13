using AutoMapper;
using E_LearningApi.Data;
using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Cart;
using E_LearningApi.DTOs.CartItem;
using E_LearningApi.Exceptions;
using E_LearningApi.Exceptions.Auth;
using E_LearningApi.Services.Auth.CurrentUsers;
using E_LearningApi.Services.Files;
using Microsoft.EntityFrameworkCore;

namespace E_LearningApi.Services.Carts
{
    public class CartService : ICartService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public CartService(ApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task AddToCart(CreateCartItemRequest createCartItemRequest, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }
            
            var cart = await _context.Carts.Include(c => c.CartItems).SingleOrDefaultAsync(c => c.UserId.Equals(currentUser.Id), cancellationToken);
            if(cart == null) 
            {
                var newCart = new Cart
                {
                    Id = Guid.NewGuid(),
                    UserId = currentUser.Id,
                    CartItems = new List<CartItem>(),
                };

                

                var newCartItem = new CartItem
                {
                    CartId = newCart.Id,
                    CourseId = createCartItemRequest.courseId,
                };

                var course = await _context.Courses.SingleOrDefaultAsync(c => c.Id == createCartItemRequest.courseId);

                newCart.Total += (decimal)course.Price;

                await _context.Carts.AddAsync(newCart);

                await _context.CartItems.AddAsync(newCartItem);
            }
            else
            {
               var existingCartItem = cart.CartItems.SingleOrDefault(ci => ci.CourseId == createCartItemRequest.courseId);
              // var existingCartItem = await _context.CartItems.SingleOrDefaultAsync(eci => eci.CourseId == createCartItemRequest.courseId);

                if (existingCartItem != null)
                {
                    throw new ItemNotUniqueException($"course id: {existingCartItem.CourseId}");
                }

                var cartItem = _mapper.Map<CartItem>(createCartItemRequest);
                cartItem.CartId = cart.Id;

                var course = await _context.Courses.SingleOrDefaultAsync(c => c.Id == createCartItemRequest.courseId);

                if (course == null)
                {
                    throw new ItemNotFoundException("Course not found");
                }

                cart.Total += (decimal)course.Price;
                await _context.CartItems.AddAsync(cartItem);
            }

            await _context.SaveChangesAsync();
        }

        public async Task RemoveFromCart(DeleteCartItemRequest deleteCartItemRequest, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var cart = await _context.Carts.Include(c => c.CartItems).SingleOrDefaultAsync(c => c.UserId.Equals(currentUser.Id), cancellationToken);

            var cartItem = cart.CartItems.SingleOrDefault(ci => ci.CourseId.Equals(deleteCartItemRequest.courseId));

            if(cartItem == null)
            {
                throw new ItemNotFoundException("Course not found");
            }

            var course = await _context.Courses.SingleOrDefaultAsync(c => c.Id.Equals(deleteCartItemRequest.courseId));

            if(course == null)
            {
                throw new ItemNotFoundException("Course not found");
            }

            cart.Total -= (decimal)course.Price;
            _context.CartItems.Remove(cartItem);

            await _context.SaveChangesAsync();
        }

        public async Task<GetCartResponse> GetCart(CancellationToken cancellationToken)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            // Step 2: Check if the cart exists for the logged-in user
            var cart = await _context.Carts
                .Include(c => c.CartItems) // Include CartItems
                .ThenInclude(ci => ci.Course)
                .ThenInclude(co => co.Thumbnail)// Include Course details for CartItems
                .SingleOrDefaultAsync(c => c.UserId.Equals(currentUser.Id), cancellationToken);

            // Step 3: If the cart doesn't exist, create a new one
            if (cart == null)
            {
                cart = new Cart
                {
                    Id = Guid.NewGuid(),
                    UserId = currentUser.Id,
                    CartItems = new List<CartItem>(), // Initialize an empty cart
                };

                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            // Step 4: Map the cart and cart items to DTOs
            var cartDto = _mapper.Map<GetCartResponse>(cart);

            // Step 5: Return the DTO
            return cartDto;
        }
    }
}
