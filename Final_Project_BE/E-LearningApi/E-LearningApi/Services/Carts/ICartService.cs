using E_LearningApi.DTOs.Cart;
using E_LearningApi.DTOs.CartItem;

namespace E_LearningApi.Services.Carts
{
    public interface ICartService
    {
        Task AddToCart(CreateCartItemRequest createCartItemRequest, CancellationToken cancellationToken);

        Task<GetCartResponse> GetCart(CancellationToken cancellationToken);

        Task RemoveFromCart(DeleteCartItemRequest deleteCartItemRequest, CancellationToken cancellationToken);
    }
}
