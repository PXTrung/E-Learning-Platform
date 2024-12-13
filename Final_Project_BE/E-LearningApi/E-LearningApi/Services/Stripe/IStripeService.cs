using Stripe;

namespace E_LearningApi.Services.Stripe
{
    public interface IStripeService
    {
        Task<PaymentIntent> CreatePaymentIntent(decimal amount);
    }
}
