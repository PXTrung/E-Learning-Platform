using E_LearningApi.DTOs.Lesson;

namespace E_LearningApi.Services.Lessons
{
    public interface ILessonService
    {
        Task CreateLessonAsync(Guid sessionId, CreateLessonRequest request, CancellationToken cancellationToken);
        Task<IQueryable<GetListLessons>> GetAllAsync();

        Task<IQueryable<GetListLessons>> GetLessionsInSessionAsync(Guid id);

        Task<GetLessonResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken);

        Task UpdateLessonAsync(Guid id, UpdateLessonRequest request, CancellationToken cancellationToken);

        Task DeleteLessonAsync(Guid id, CancellationToken cancellationToken);
    }
}
