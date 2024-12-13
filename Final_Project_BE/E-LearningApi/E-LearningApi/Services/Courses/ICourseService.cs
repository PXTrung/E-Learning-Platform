using E_LearningApi.DTOs.Course;
using E_LearningApi.Sieve;
using Sieve.Models;
using Sieve.Services;

namespace E_LearningApi.Services.Courses
{
    public interface ICourseService
    {
        Task CreateCourseAsync(CreateCourseRequest request, CancellationToken cancellationToken);

        //Task<IQueryable<GetListCourses>> GetAllAsync();

        Task<PaginatedList<GetListCourses>> GetAllAsync(ISieveProcessor sieveProcessor, SieveModel sieveModel, IHttpContextAccessor httpContextAccessor);

        Task UpdateCourseAsync(Guid id, UpdateCourseRequest request, CancellationToken cancellationToken);

        Task<GetCourseResponse> GetCourseByIdAsync(Guid id, CancellationToken cancellationToken);

        Task DeleteCourseAsync(Guid id, CancellationToken cancellationToken);
    }
}
