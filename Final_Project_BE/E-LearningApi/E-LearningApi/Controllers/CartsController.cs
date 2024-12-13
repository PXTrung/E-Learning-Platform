using E_LearningApi.DTOs.CartItem;
using E_LearningApi.DTOs.Category;
using E_LearningApi.Services.Carts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace E_LearningApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ICartService _cartService;
        public CartsController(ICartService cartService)
        {
            _cartService = cartService;
        }

        /// <summary>
        ///     Get Cart
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetCart(CancellationToken cancellationToken)
        {
            var cart = await _cartService.GetCart(cancellationToken);
            //return Ok(new { message = "Successfully retrieved all levels", data = levels });

            //return Ok(await courses.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));

            return Ok(cart);
        }

        /// <summary>
        ///     Add to Cart
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> AddToCart(CreateCartItemRequest request, CancellationToken cancellationToken)
        {

            await _cartService.AddToCart(request, cancellationToken);
            //return Ok(new { Message = "Item has been successfully added to cart" });
            return StatusCode(StatusCodes.Status201Created, new { Message = "Item has been successfully added to cart" });

        }

        /// <summary>
        ///     Remove From Cart
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> RemoveFromCart(DeleteCartItemRequest request, CancellationToken cancellationToken)
        {

            await _cartService.RemoveFromCart(request, cancellationToken);
            return Ok(new { Message = "Item has been successfully remove from cart" });
            

        }
    }
}
