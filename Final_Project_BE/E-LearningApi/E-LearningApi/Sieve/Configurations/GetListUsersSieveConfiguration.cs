using E_LearningApi.DTOs.Auth;
using E_LearningApi.DTOs.Category;
using Sieve.Services;

namespace E_LearningApi.Sieve.Configurations
{
    public class GetListUsersSieveConfiguration : ISieveConfiguration
    {
        public void Configure(SievePropertyMapper mapper)
        {
            mapper.Property<GetListUsers>(c => c.FullName)
                .CanFilter()
                .CanSort();
        }
    }
}
