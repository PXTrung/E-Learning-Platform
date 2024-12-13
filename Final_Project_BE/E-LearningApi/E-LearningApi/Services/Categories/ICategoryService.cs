using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Category;

namespace E_LearningApi.Services.Categories
{
    public interface ICategoryService
    {
            Task<IQueryable<GetListCategories>> GetAllAsync();
            Task<GetCategoryResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken);

            Task CreateCategoryAsync(CreateCategoryRequest request, CancellationToken cancellationToken);

            Task UpdateCategoryAsync(Guid id, UpdateCategoryRequest request, CancellationToken cancellationToken);

            Task DeleteCategoryAsync(Guid id, CancellationToken cancellationToken);
    }
}
