using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Enrollment;
using E_LearningApi.Services.Categories;
using E_LearningApi.Services.Enrollments;
using E_LearningApi.Sieve;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Sieve.Services;

namespace E_LearningApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentsController : ControllerBase
    {
        private readonly IEnrollmentService _enrollmentService;
        private readonly ISieveProcessor _sieveProcessor;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public EnrollmentsController(IEnrollmentService enrollmentService, ISieveProcessor sieveProcessor, IHttpContextAccessor httpContextAccessor)
        {
            _enrollmentService = enrollmentService;
            _sieveProcessor = sieveProcessor;
            _httpContextAccessor = httpContextAccessor;
        }
        /// <summary>
        ///     Get All Enrollments
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllCategory([FromQuery] SieveModel sieveModel)
        {
            var enrollments = await _enrollmentService.GetAllAsync();

            /*return Ok(new {Message = "Successfully retrieved all categories", Data = categories});*/
            return Ok(await enrollments.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));
        }

        /// <summary>
        ///     Get Enrollment by Id
        /// </summary>
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetEnrollmentById([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var category = await _enrollmentService.GetByIdAsync(id, cancellationToken);
            return Ok(new { Message = $"Enrollment {id} is succesfully retrieved", Data = category });
        }

        [HttpPost("add-enrollment")]
        public async Task<IActionResult> AddEnrollmentToGroup(AddEnrollmentRequest addEnrollmentRequest)
        {
            await _enrollmentService.AddEnrollmentToGroupAsync(addEnrollmentRequest);
            return Ok(new { Message = $"Enrollment is succesfully added to group" });
        }

        [HttpPost("remove-enrollment")]
        public async Task<IActionResult> RemoveEnrollmentFromGroup(RemoveEnrollmentRequest removeEnrollmentRequest)
        {
            await _enrollmentService.RemoveEnrollmentFromGroupAsync(removeEnrollmentRequest);
            return Ok(new { Message = $"Enrollment is succesfully remove from group" });
        }
    }
}
