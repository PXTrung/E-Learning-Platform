using E_LearningApi.DTOs.Enrollment;

namespace E_LearningApi.Services.Enrollments
{
    public interface IEnrollmentService
    {
        Task<IQueryable<EnrollmentListResponse>> GetAllAsync();
        Task<EnrollmentResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken);

        Task AddEnrollmentToGroupAsync(AddEnrollmentRequest addEnrollmentRequest);

        Task RemoveEnrollmentFromGroupAsync(RemoveEnrollmentRequest removeEnrollmentRequest);
    }
}
