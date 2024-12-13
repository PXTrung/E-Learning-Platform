using Stripe;

namespace E_LearningApi.Services.Stripe
{
    public class StripeService : IStripeService
    {
        private readonly string? _stripeSecretKey;

        public StripeService(IConfiguration configuration)
        {
            _stripeSecretKey = configuration["Stripe:SecretKey"];
            StripeConfiguration.ApiKey = _stripeSecretKey;
        }

        public async Task<PaymentIntent> CreatePaymentIntent(decimal amount)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(amount), // Stripe expects amounts in the smallest currency unit (cents for USD)
                Currency = "vnd", // Change this to your currency
                PaymentMethodTypes = new List<string> { "card" },
            };

            var service = new PaymentIntentService();
            return await service.CreateAsync(options);
        }
    }
}
