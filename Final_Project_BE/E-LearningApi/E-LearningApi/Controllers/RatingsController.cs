using E_LearningApi.DTOs.Session;
using E_LearningApi.Services.Ratings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using E_LearningApi.Sieve;
using Sieve.Models;
using Sieve.Services;
using E_LearningApi.DTOs.Rating;

namespace E_LearningApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly IRatingService _ratingService;
        private readonly ISieveProcessor _sieveProcessor;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public RatingsController(IRatingService ratingService, ISieveProcessor sieveProcessor, IHttpContextAccessor httpContextAccessor)
        {
            _ratingService = ratingService;
            _sieveProcessor = sieveProcessor;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        ///     Get All Ratings
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllSessions([FromQuery] SieveModel sieveModel)
        {
            var ratings = await _ratingService.GetAllRating();
            //return Ok(new { message = "Successfully retrieved all levels", data = levels });

            return Ok(await ratings.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));
        }

        /// <summary>
        ///     Get All Ratings in Course
        /// </summary>
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetRatingByCourseId([FromQuery] SieveModel sieveModel, [FromRoute] Guid id)
        {
            var ratings = await _ratingService.GetRatingByCourseId(id);

            return Ok(await ratings.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));
        }

        /// <summary>
        ///     Create new Rating
        /// </summary>
        [HttpPost]
        [Route("CreateRating")]
        public async Task<IActionResult> CreateRating(CreateRatingRequest request, CancellationToken cancellationToken)
        {

            var data = await _ratingService.CreateRatingAsync(request, cancellationToken);
            return Ok(new { message = "Rating is successfully created", data = data });

        }

        /// <summary>
        ///     Get Rating by Id
        /// </summary>
        [HttpGet]
        [Route("GetById/{id:guid}")]
        public async Task<IActionResult> GetRatingById([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var rating = await _ratingService.GetByIdAsync(id, cancellationToken);
            return Ok(new { Message = $"Rating {id} is succesfully retrieved", Data = rating });
        }

        /// <summary>
        ///     Update Rating
        /// </summary>
        [HttpPut]
        [Route("EditRating")]
        public async Task<IActionResult> UpdateRating(EditRatingRequest request, CancellationToken cancellationToken)
        {
            var data = await _ratingService.UpdateRatingAsync(request, cancellationToken);
            return Ok(new { Message = "Rating is updated successfully", data });
        }

        /// <summary>
        ///     Detele Rating
        /// </summary>
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteRating([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            await _ratingService.DeleteRatingAsync(id, cancellationToken);
            return Ok(new { Message = "Delete rating successfully" });
        }
    }
}
