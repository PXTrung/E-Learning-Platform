using E_LearningApi.DTOs.Category;
using E_LearningApi.DTOs.CourseGroup;
using E_LearningApi.Services.Categories;
using E_LearningApi.Services.CourseGroups;
using E_LearningApi.Sieve;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Sieve.Services;

namespace E_LearningApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseGroupsController : ControllerBase
    {
        private readonly ICourseGroupService _courseGroupService;
        private readonly ISieveProcessor _sieveProcessor;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CourseGroupsController(ICourseGroupService courseGroupService, ISieveProcessor sieveProcessor, IHttpContextAccessor httpContextAccessor)
        {
            _courseGroupService = courseGroupService;
            _sieveProcessor = sieveProcessor;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        ///     Get All Course Groups
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllCourseGroup([FromQuery] SieveModel sieveModel)
        {
            var courseGroups = await _courseGroupService.GetAllAsync();

            return Ok(await courseGroups.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));
        }

        /// <summary>
        ///     Get Course Group by Id
        /// </summary>
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCourseGroupById([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var category = await _courseGroupService.GetByIdAsync(id, cancellationToken);
            return Ok(new { Message = $"CourseGroup {id} is succesfully retrieved", Data = category });
        }

        /// <summary>
        ///     Create new Course Group
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCourseGroupRequest request, CancellationToken cancellationToken)
        {

            await _courseGroupService.CreateCourseGroupAsync(request, cancellationToken);
            return Ok(new { Message = "CourseGroup is successfully created" });

        }

        /// <summary>
        ///     Update Course Group
        /// </summary>
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, UpdateCourseGroupRequest request, CancellationToken cancellationToken)
        {
            await _courseGroupService.EditCourseGroupAsync(id, request, cancellationToken);
            return Ok(new { Message = "CourseGroup is updated successfully" });
        }

        /// <summary>
        ///     Detele Course Groups
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(Guid id, CancellationToken cancellationToken)
        {
            await _courseGroupService.DeleteCourseGroupAsync(id, cancellationToken);
            return Ok(new { Message = "Delte courseGroup successfully" });
        }
    }
}
