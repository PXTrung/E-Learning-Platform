using E_LearningApi.DTOs.Rating;

namespace E_LearningApi.Services.Ratings
{
    public interface IRatingService
    {
        Task<string> CreateRatingAsync(CreateRatingRequest request, CancellationToken cancellationToken);
        Task<string> UpdateRatingAsync(EditRatingRequest request, CancellationToken cancellationToken);

        Task<IQueryable<RatingListResponse>> GetRatingByCourseId(Guid courseId);

        Task<IQueryable<RatingListResponseAll>> GetAllRating();

        Task DeleteRatingAsync(Guid id, CancellationToken cancellationToken);

        Task<RatingResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    }
}
