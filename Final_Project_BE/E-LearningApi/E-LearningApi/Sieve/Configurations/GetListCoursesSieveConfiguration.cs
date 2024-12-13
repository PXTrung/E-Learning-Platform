using E_LearningApi.DTOs.Course;
using Sieve.Services;

namespace E_LearningApi.Sieve.Configurations
{
    public class GetListCoursesSieveConfiguration : ISieveConfiguration
    {
        public void Configure(SievePropertyMapper mapper)
        {
            mapper.Property<GetListCourses>(c => c.Name)
                .CanFilter()
                .CanSort();

            mapper.Property<GetListCourses>(c => c.Level)
                .CanFilter()
                .CanSort();

            mapper.Property<GetListCourses>(c => c.Category)
                .CanFilter()
                .CanSort();
        }
    }
}
