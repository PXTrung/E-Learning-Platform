using E_LearningApi.DTOs.Course;
using E_LearningApi.DTOs.Lesson;
using E_LearningApi.Services.Lessons;
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
    public class LessonsController : ControllerBase
    {
        private readonly ILessonService _lessonService;
        private readonly ISieveProcessor _sieveProcessor;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LessonsController(ILessonService lessonService, ISieveProcessor sieveProcessor, IHttpContextAccessor httpContextAccessor)
        {
            _lessonService = lessonService;
            _sieveProcessor = sieveProcessor;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        ///     Get All Lessons
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllLessons([FromQuery] SieveModel sieveModel)
        {
            var lessons = await _lessonService.GetAllAsync();

            return Ok(await lessons.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));
        }

        /// <summary>
        ///     Get All Lessons in Session
        /// </summary>
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetAllLessonsInSession([FromQuery] SieveModel sieveModel, [FromRoute] Guid id)
        {
            var lessons = await _lessonService.GetLessionsInSessionAsync(id);

            return Ok(await lessons.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));
        }

        /// <summary>
        ///     Get Lesson By Id
        /// </summary>
        [HttpGet]
        [Route("GetById/{id:guid}")]
        public async Task<IActionResult> GetLessonById([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var course = await _lessonService.GetByIdAsync(id, cancellationToken);

            return Ok(new { Message = $"Lesson {id} is succesfully retrieved", Data = course });
        }

        /// <summary>
        ///     Create new Lesson
        /// </summary>
        [HttpPost]
        [Route("{id:guid}")]
        public async Task<IActionResult> CreateLesson([FromRoute] Guid id, [FromForm] CreateLessonRequest request, CancellationToken cancellationToken)
        {
            await _lessonService.CreateLessonAsync(id, request, cancellationToken);
            return Ok(new { message = "Lesson is successfully created" });
        }

        /// <summary>
        ///     Update Lesson
        /// </summary>
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateLesson([FromRoute] Guid id, [FromForm] UpdateLessonRequest request, CancellationToken cancellationToken)
        {
            await _lessonService.UpdateLessonAsync(id, request, cancellationToken);
            return Ok(new { message = "Lesson is updated successfully" });
        }

        /// <summary>
        ///     Delete Lesson
        /// </summary>
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteLesson([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            await _lessonService.DeleteLessonAsync(id, cancellationToken);
            return Ok(new { Message = "Delete Lesson successfully" });
        }
    }
}
