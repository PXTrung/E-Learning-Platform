using AutoMapper;
using E_LearningApi.Data;
using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Course;
using E_LearningApi.Exceptions;
using E_LearningApi.Services.Auth.CurrentUsers;
using E_LearningApi.Services.Files;
using E_LearningApi.Sieve;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;
using Stripe;

namespace E_LearningApi.Services.Courses
{
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public CourseService(ApplicationDbContext context, IFileService fileService, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _fileService = fileService;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task CreateCourseAsync(CreateCourseRequest request, CancellationToken cancellationToken)
        {

            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id.Equals(request.CategoryId), cancellationToken);

            if (category == null)
            {
                throw new ItemNotFoundException("Category with given Id not found");
            }

            var courseEntity = _mapper.Map<Course>(request);

            // Save file to folder
            var thumbnailEntity = await _fileService.SaveFileAync(request.ThumbnailFile, "thumbnail");
            await _context.Media.AddAsync(thumbnailEntity);

            // Connect FK
            courseEntity.ThumbnailId = thumbnailEntity.Id;


            await _context.Courses.AddAsync(courseEntity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<PaginatedList<GetListCourses>> GetAllAsync(ISieveProcessor sieveProcessor, SieveModel sieveModel, IHttpContextAccessor httpContextAccessor)
        {
            var courses = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Thumbnail)
                .Include(c => c.Sessions)
                .ThenInclude(c => c.Lessions)
                .Include(c => c.Ratings)
                .OrderBy(c => c.CreatedAt)
                .ToListAsync();

            //var coursesDto = _mapper.ProjectTo<GetListCourses>(courses);


            var coursesDto = courses.Select(course => new GetListCourses
            {
                Id = course.Id,
                Name = course.Name,
                Description = course.Description,
                Category = course.Category.Name,
                Price = course.Price,
                Level = course.Level,
                ThumbnailUrl = course.Thumbnail.UrlFilePath,
                TotalTime = course.Sessions.SelectMany(s => s.Lessions).Any()
                    ? TimeSpan.FromMinutes(course.Sessions.SelectMany(s => s.Lessions).Sum(l => l.Duration.TotalMinutes))
                    : TimeSpan.Zero,
                NumberOfLessons = course.Sessions.SelectMany(s => s.Lessions).Count(),
                AverageRating = course.Ratings.Any()
                ? course.Ratings.Average(r => r.Star)
                : 0,
                CreatedAt = course.CreatedAt,
                UpdatedAt = course.UpdatedAt
            }).ToList();


            //return Task.FromResult(coursesDto);
            return await coursesDto.ToPaginatedListAsync(sieveProcessor, sieveModel, httpContextAccessor); 
        }


        public async Task<GetCourseResponse> GetCourseByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var course = await _context.Courses
                .Include(c => c.Category)
                .Include(c => c.Thumbnail)
                .Include(c => c.Sessions)
                .ThenInclude(c => c.Lessions)
                .Include(c => c.Ratings)
                .FirstOrDefaultAsync(c => c.Id.Equals(id), cancellationToken);

            if (course == null)
            {
                throw new ItemNotFoundException("Course not found");
            }

            var totalTimeSpan = course.Sessions.SelectMany(s => s.Lessions).Any()
                ? TimeSpan.FromMinutes(course.Sessions.SelectMany(s => s.Lessions).Sum(l => l.Duration.TotalMinutes))
                : TimeSpan.Zero;

            // Calculate the average star rating if there are any ratings
            var averageRating = course.Ratings.Any()
                ? course.Ratings.Average(r => r.Star)
                : 0;

            //var courseDto = _mapper.Map<GetCourseResponse>(course);

            var courseDto =  new GetCourseResponse
            {
                Id = course.Id,
                Name = course.Name,
                Description = course.Description,
                Category = course.Category.Name,
                Price = course.Price,
                Level = course.Level,
                ThumbnailUrl = course.Thumbnail.UrlFilePath,
                TotalTime = totalTimeSpan,
                NumberOfLessons = course.Sessions.SelectMany(s => s.Lessions).Count(),
                AverageRating = averageRating,
                CreatedAt = course.CreatedAt,
                UpdatedAt = course.UpdatedAt
            };

            return courseDto;
        }


        public async Task UpdateCourseAsync(Guid id, UpdateCourseRequest request, CancellationToken cancellationToken)
        {

            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id.Equals(request.CategoryId), cancellationToken);

            if (category == null)
            {
                throw new ItemNotFoundException("Category not found");
            }

            var course = await _context.Courses
                .Include (c => c.Category)
                .Include(c => c.Thumbnail)
                .FirstOrDefaultAsync(c => c.Id.Equals(id), cancellationToken);

            if(course == null)
            {
                throw new ItemNotFoundException("Course not found");
            }

            _mapper.Map(request, course);

            if(request.ThumbnailFile != null)
            {
                await _fileService.UpdateFileAsync(request.ThumbnailFile, "thumbnail", course.Thumbnail);
            }

            course.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteCourseAsync(Guid id, CancellationToken cancellationToken)
        {
            var course = await _context.Courses
                .Include(c => c.Thumbnail)
                .FirstOrDefaultAsync(c => c.Id.Equals(id), cancellationToken); 
            
            if (course == null)
            {
                throw new ItemNotFoundException("Course not found");
            }

            _context.Remove(course);

            _fileService.DeleteFile(course.Thumbnail.LocalFilePath);
            _context.Remove(course.Thumbnail);

            await _context.SaveChangesAsync();
        }
    }
}
