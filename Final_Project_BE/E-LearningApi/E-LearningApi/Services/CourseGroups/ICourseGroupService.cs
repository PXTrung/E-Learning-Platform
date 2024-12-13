using E_LearningApi.DTOs.CourseGroup;

namespace E_LearningApi.Services.CourseGroups
{
    public interface ICourseGroupService
    {
        Task CreateCourseGroupAsync(CreateCourseGroupRequest request, CancellationToken cancellationToken);
        Task<IQueryable<CourseGroupListResponse>> GetAllAsync();
        Task<CourseGroupResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken);

        Task EditCourseGroupAsync(Guid id, UpdateCourseGroupRequest request, CancellationToken cancellationToken);
        Task DeleteCourseGroupAsync(Guid id, CancellationToken cancellationToken);
    }
}
