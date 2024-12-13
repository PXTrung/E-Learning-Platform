using E_LearningApi.DTOs.Category;
using E_LearningApi.DTOs.Course;
using Sieve.Services;

namespace E_LearningApi.Sieve.Configurations
{
    public class GetListCategoriesSieveConfiguration : ISieveConfiguration
    {
        public void Configure(SievePropertyMapper mapper)
        {
              mapper.Property<GetListCategories>(c => c.Name)
                  .CanFilter()
                  .CanSort(); 
        }
    }
}
