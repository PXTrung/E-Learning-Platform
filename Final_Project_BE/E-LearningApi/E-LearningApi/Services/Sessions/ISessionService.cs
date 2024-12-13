using E_LearningApi.DTOs.Level;
using E_LearningApi.DTOs.Session;

namespace E_LearningApi.Services.Sessions
{
    public interface ISessionService
    {
        Task<IQueryable<GetListSessions>> GetAllAsync();

        Task<IQueryable<GetListSessions>> GetSessionsInCourseAsync(Guid id);
        Task<GetSessionResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken);

        Task CreateSessionAsync(Guid id, CreateSessionRequest request, CancellationToken cancellationToken);

        Task UpdateSessionAsync(Guid id, UpdateSessionRequest request, CancellationToken cancellationToken);

        Task DeleteSessionAsync(Guid id, CancellationToken cancellationToken);
    }
}
