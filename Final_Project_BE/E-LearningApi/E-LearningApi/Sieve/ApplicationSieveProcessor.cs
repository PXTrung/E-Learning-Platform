using Microsoft.Extensions.Options;
using Sieve.Models;
using Sieve.Services;

namespace E_LearningApi.Sieve
{
    public class ApplicationSieveProcessor : SieveProcessor
    {
        protected override SievePropertyMapper MapProperties(SievePropertyMapper mapper)
        {
            return mapper.ApplyConfigurationsFromAssembly(typeof(ApplicationSieveProcessor).Assembly);
        }

        public ApplicationSieveProcessor(IOptions<SieveOptions> options) : base(options)
        {
        }
    }
}
