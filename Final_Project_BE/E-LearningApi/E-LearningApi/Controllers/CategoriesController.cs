using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Category;
using E_LearningApi.Services.Categories;
using E_LearningApi.Sieve;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Sieve.Services;

namespace E_LearningApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly ISieveProcessor _sieveProcessor;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CategoriesController(ICategoryService categoryService, ISieveProcessor sieveProcessor, IHttpContextAccessor httpContextAccessor)
        {
            _categoryService = categoryService;
            _sieveProcessor = sieveProcessor;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        ///     Get All Categories
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllCategory([FromQuery] SieveModel sieveModel)
        {
                var categories = await _categoryService.GetAllAsync();

            /*return Ok(new {Message = "Successfully retrieved all categories", Data = categories});*/
            return Ok(await categories.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));
        }

        /// <summary>
        ///     Create new Category
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequest request, CancellationToken cancellationToken)
        {

                await _categoryService.CreateCategoryAsync(request, cancellationToken);
                return Ok(new { Message = "Category is successfully created" });
    
        }

        /// <summary>
        ///     Get Category by Id
        /// </summary>
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCategoryById([FromRoute]Guid id, CancellationToken cancellationToken)
        {
            var category = await _categoryService.GetByIdAsync(id, cancellationToken);
            return Ok(new {Message = $"Category {id} is succesfully retrieved", Data = category});
        }

        /// <summary>
        ///     Update Category
        /// </summary>
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateCategory([FromRoute]Guid id,  UpdateCategoryRequest request, CancellationToken cancellationToken)
        {
            await _categoryService.UpdateCategoryAsync(id, request, cancellationToken);
            return Ok(new { Message = "Category is updated successfully" });
        }

        /// <summary>
        ///     Detele Category
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(Guid id, CancellationToken cancellationToken)
        {
            await _categoryService.DeleteCategoryAsync(id, cancellationToken);
            return Ok(new { Message = "Delte category successfully" });
        }
    }
}
