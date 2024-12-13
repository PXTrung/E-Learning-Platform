using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Course;
using E_LearningApi.Services.Courses;
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
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly ISieveProcessor _sieveProcessor;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CoursesController(ICourseService courseService, ISieveProcessor sieveProcessor, IHttpContextAccessor httpContextAccessor)
        {
            _courseService = courseService;
            _sieveProcessor = sieveProcessor;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        ///     Get All Courses
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllCourses([FromQuery] SieveModel sieveModel)
        {
            var courses = await _courseService.GetAllAsync(_sieveProcessor, sieveModel, _httpContextAccessor);
            //return Ok(new { message = "Successfully retrieved all levels", data = levels });

            //return Ok(await courses.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));

            return Ok(courses);
        }

        /// <summary>
        ///     Get Course By Id
        /// </summary>
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCourseById([FromRoute]Guid id, CancellationToken cancellationToken)
        {
            var course = await _courseService.GetCourseByIdAsync(id, cancellationToken);
            //return Ok(new { message = "Successfully retrieved all levels", data = levels });

            return Ok(new { Message = $"Course {id} is succesfully retrieved", Data = course });
        }

        /// <summary>
        ///     Create new Course
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateCourse([FromForm] CreateCourseRequest request, CancellationToken cancellationToken)
        {

            await _courseService.CreateCourseAsync(request, cancellationToken);
            return Ok(new { message = "Course is successfully created" });

        }

        /// <summary>
        ///     Update Course
        /// </summary>
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateCourse([FromRoute] Guid id, [FromForm] UpdateCourseRequest request, CancellationToken cancellationToken)
        {
            await _courseService.UpdateCourseAsync(id, request, cancellationToken);
            return Ok(new { message = "Course is updated successfully" });
        }

        /// <summary>
        ///     Delete Course
        /// </summary>
        [HttpDelete]
        public async Task<IActionResult> DeleteCourse(Guid id, CancellationToken cancellationToken)
        {
            await _courseService.DeleteCourseAsync(id, cancellationToken);
            return Ok(new { Message = "Delete course successfully" });
        }
    }
}
