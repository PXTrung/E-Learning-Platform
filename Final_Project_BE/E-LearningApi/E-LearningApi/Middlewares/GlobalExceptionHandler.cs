using E_LearningApi.Common;
using E_LearningApi.Exceptions;
using E_LearningApi.Exceptions.Auth;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;

namespace E_LearningApi.Middlewares
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            _logger.LogError($"An Error occurred while processing your request: {exception.Message}");

            if(exception.InnerException != null)
            {
                _logger.LogError($"Error: {exception.InnerException.Message}");
            }

            /*  var errorResponse = new ErrorResponse
              {
                  Message = exception.Message,
              };

              switch(exception )
              {
                  case BadHttpRequestException:
                      errorResponse.StatusCode = (int)HttpStatusCode.BadRequest; 
                      errorResponse.Title = exception.GetType().Name;
                      break;

                  default:
                      errorResponse.StatusCode = (int)HttpStatusCode.InternalServerError;
                      errorResponse.Message = exception.GetType().Name;
                      break;
              }*/

            var errorResponse = exception switch
            {
                NotFoundException nf => new ErrorResponse
                {
                    Title = "NotFound",
                    Type = exception.GetType().Name,
                    Message = nf.Message,
                    StatusCode = StatusCodes.Status404NotFound
                },
                AuthenticationException ae => new ErrorResponse
                {
                    Title = "Unauthorize",
                    Type = exception.GetType().Name,
                    Message = ae.Message,
                    StatusCode = StatusCodes.Status401Unauthorized
                },
                ArgumentNullException are => new ErrorResponse
                {
                    Title = "InvalidContent",
                    Type = exception.GetType().Name,
                    Message = are.Message,
                    StatusCode = StatusCodes.Status400BadRequest
                },
                NotUniqueException nu => new ErrorResponse
                {
                    Title = "BadRequest",
                    Type = exception.GetType().Name,
                    Message = nu.Message,
                    StatusCode= StatusCodes.Status400BadRequest
                },
                _ => new ErrorResponse
                {
                    Title = "Server Error",
                    Type = exception.GetType().Name,
                    Message = exception.Message,
                    StatusCode = StatusCodes.Status500InternalServerError
                }
            };

            httpContext.Response.StatusCode = errorResponse.StatusCode;

            await httpContext.Response.WriteAsJsonAsync( errorResponse, cancellationToken );

            return true;
        }
    }
}
