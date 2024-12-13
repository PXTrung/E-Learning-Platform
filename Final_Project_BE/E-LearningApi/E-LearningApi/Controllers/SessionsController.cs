using E_LearningApi.DTOs.Level;
using E_LearningApi.DTOs.Session;
using E_LearningApi.Services.Sessions;
using E_LearningApi.Sieve;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Sieve.Services;

namespace E_LearningApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        private readonly ISessionService _sessionService;
        private readonly ISieveProcessor _sieveProcessor;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SessionsController(ISessionService sessionService, ISieveProcessor sieveProcessor, IHttpContextAccessor httpContextAccessor)
        {
            _sessionService = sessionService;
            _sieveProcessor = sieveProcessor;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        ///     Get All Sessions
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllSessions([FromQuery] SieveModel sieveModel)
        {
            var sessions = await _sessionService.GetAllAsync();
            //return Ok(new { message = "Successfully retrieved all levels", data = levels });

            return Ok(await sessions.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));
        }

        /// <summary>
        ///     Get All Sessions in Course
        /// </summary>
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetAllSessionsInCourse([FromQuery] SieveModel sieveModel, [FromRoute]Guid id)
        {
            var sessions = await _sessionService.GetSessionsInCourseAsync(id);
            //return Ok(new { message = "Successfully retrieved all levels", data = levels });

            return Ok(await sessions.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));
        }

        /// <summary>
        ///     Create new Session
        /// </summary>
        [HttpPost]
        [Route("{id:guid}")]
        public async Task<IActionResult> CreateSession([FromRoute] Guid id, CreateSessionRequest request, CancellationToken cancellationToken)
        {

            await _sessionService.CreateSessionAsync(id, request, cancellationToken);
            return Ok(new { message = "Session is successfully created" });

        }

        /// <summary>
        ///     Get Session by Id
        /// </summary>
        [HttpGet]
        [Route("GetById/{id:guid}")]
        public async Task<IActionResult> GetSessionById([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var session = await _sessionService.GetByIdAsync(id, cancellationToken);
            return Ok(new { Message = $"Session {id} is succesfully retrieved", Data = session });
        }

        /// <summary>
        ///     Update Session
        /// </summary>
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateSession([FromRoute] Guid id, UpdateSessionRequest request, CancellationToken cancellationToken)
        {
            await _sessionService.UpdateSessionAsync(id, request, cancellationToken);
            return Ok(new { Message = "Session is updated successfully" });
        }

        /// <summary>
        ///     Detele Session
        /// </summary>
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            await _sessionService.DeleteSessionAsync(id, cancellationToken);
            return Ok(new { Message = "Delete level successfully" });
        }
    }
}
