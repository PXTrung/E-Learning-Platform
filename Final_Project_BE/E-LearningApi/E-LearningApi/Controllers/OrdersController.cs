using E_LearningApi.Services.Orders;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using E_LearningApi.Sieve;
using Sieve.Models;
using Sieve.Services;

namespace E_LearningApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ISieveProcessor _sieveProcessor;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public OrdersController(ISieveProcessor sieveProcessor, IHttpContextAccessor httpContextAccessor, IOrderService orderService)
        {
            _httpContextAccessor = httpContextAccessor;
            _orderService = orderService;
            _sieveProcessor = sieveProcessor;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders([FromQuery] SieveModel sieveModel)
        {
            var orders = await _orderService.GetAllAsync();

            return Ok(await orders.ToPaginatedListAsync(_sieveProcessor, sieveModel, _httpContextAccessor));
        }
    }
}
