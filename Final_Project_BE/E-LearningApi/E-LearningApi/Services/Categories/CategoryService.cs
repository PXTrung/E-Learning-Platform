

using AutoMapper;
using Azure.Identity;
using E_LearningApi.Data;
using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Category;
using E_LearningApi.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace E_LearningApi.Services.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        
        public CategoryService(ApplicationDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task CreateCategoryAsync(CreateCategoryRequest request, CancellationToken cancellationToken)
        {

                if( await IsNameNotUniqueAsync(request.Name))
                {
                    throw new ItemNotUniqueException(request.Name);
                }

                //Map Dto to entity
                var category = _mapper.Map<Category>(request);

                //Save to Database
                await _context.Categories.AddAsync(category, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteCategoryAsync(Guid id, CancellationToken cancellationToken)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

            if (category == null)
            {
                throw new ItemNotFoundException("Category not found");
            }

            _context.Remove(category);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public Task<IQueryable<GetListCategories>> GetAllAsync()
        {
            var categories = _context.Categories.AsNoTracking();
            var categoriesDto = _mapper.ProjectTo<GetListCategories>(categories);
            return Task.FromResult(categoriesDto);
        }

        public async Task<GetCategoryResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

            if (category == null)
            {
                throw new ItemNotFoundException("Category not found");
            }

            var categoryDto = _mapper.Map<GetCategoryResponse>(category);

            
            return categoryDto;
        }

        public async Task UpdateCategoryAsync(Guid id, UpdateCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

            if (category == null)
            {
                throw new ItemNotFoundException("Category not found");
            }

            if(!string.Equals(category.Name, request.Name, StringComparison.CurrentCultureIgnoreCase) && await IsNameNotUniqueAsync(request.Name))
            {
                throw new ItemNotUniqueException(request.Name);
            }

            // Map Dto to Entity
            var newCategory = _mapper.Map(request, category);
            newCategory.UpdatedAt = DateTime.UtcNow;

            // Save to Database
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task<bool> IsNameNotUniqueAsync(string name)
        {
            return await _context.Categories.AnyAsync(c => c.Name == name);   
        }
    }
}
