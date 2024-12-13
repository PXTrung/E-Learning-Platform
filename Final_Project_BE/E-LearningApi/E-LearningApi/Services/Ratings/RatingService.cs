using AutoMapper;
using E_LearningApi.Data;
using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.CourseGroup;
using E_LearningApi.DTOs.Rating;
using E_LearningApi.DTOs.Session;
using E_LearningApi.Exceptions;
using E_LearningApi.Exceptions.Auth;
using E_LearningApi.Services.Auth.CurrentUsers;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace E_LearningApi.Services.Ratings
{
    public class RatingService : IRatingService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public RatingService(ApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<string> CreateRatingAsync(CreateRatingRequest request, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            //Map Dto to entity
            var rating = _mapper.Map<Rating>(request);

            rating.UserId = currentUser.Id;

            //Save to Database
            await _context.ratings.AddAsync(rating, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return request.CourseId.ToString();
        }

        public async Task<string> UpdateRatingAsync(EditRatingRequest request, CancellationToken cancellationToken)
        {
            var rating = await _context.ratings.FirstOrDefaultAsync(c => c.Id.Equals(request.Id), cancellationToken);

            if (rating == null)
            {
                throw new ItemNotFoundException("Rating not found");
            }

            // Map Dto to Entity
            var newRating = _mapper.Map(request, rating);

            newRating.IsEdit = true;
            newRating.UpdatedAt = DateTime.Now;

            // Save to Database
            await _context.SaveChangesAsync(cancellationToken);

            return newRating.CourseId.ToString();
        }

        public Task<IQueryable<RatingListResponse>> GetRatingByCourseId(Guid courseId)
        {
            var rating = _context.ratings.Include(r => r.User).ThenInclude(u => u.Avatar).Where(r => r.CourseId.Equals(courseId)).OrderByDescending(r => r.CreatedAt).AsNoTracking();


            var ratingDto = _mapper.ProjectTo<RatingListResponse>(rating);

            return Task.FromResult(ratingDto);
        }

        public async Task<RatingResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var rating = await _context.ratings.FirstOrDefaultAsync(c => c.Id.Equals(id), cancellationToken);

            if (rating == null)
            {
                throw new ItemNotFoundException("Session not found");
            }

            var ratingDto = _mapper.Map<RatingResponse>(rating);


            return ratingDto;
        }

        public Task<IQueryable<RatingListResponseAll>> GetAllRating()
        {
            var rating = _context.ratings.AsNoTracking();

            var ratingDto = _mapper.ProjectTo<RatingListResponseAll>(rating);

            return Task.FromResult(ratingDto);
        }

        public async Task DeleteRatingAsync(Guid id, CancellationToken cancellationToken)
        {
            var rating = await _context.ratings.FirstOrDefaultAsync(r => r.Id.Equals(id), cancellationToken);

            if (rating == null)
            {
                throw new ItemNotFoundException("Rating not found");
            }

            _context.Remove(rating);
            await _context.SaveChangesAsync();
        }

    }
}
