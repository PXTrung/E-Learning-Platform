using E_LearningApi.DTOs.Level;
using Sieve.Services;

namespace E_LearningApi.Sieve.Configurations
{
    public class GetListLevelsSieveConfiguration : ISieveConfiguration
    {
        public void Configure(SievePropertyMapper mapper)
        {
            mapper.Property<GetListLevels>(c => c.Name)
                .CanFilter()
                .CanSort();

            mapper.Property<GetListLevels>(c => c.CreatedAt)
                .CanFilter()
                .CanSort();

            mapper.Property<GetListLevels>(c => c.UpdatedAt)
                .CanFilter()
                .CanSort();
        }
    }
}
