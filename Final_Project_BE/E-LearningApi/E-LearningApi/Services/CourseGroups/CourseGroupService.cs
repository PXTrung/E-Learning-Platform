using AutoMapper;
using E_LearningApi.Data;
using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Category;
using E_LearningApi.DTOs.CourseGroup;
using E_LearningApi.DTOs.Enrollment;
using E_LearningApi.Exceptions;
using E_LearningApi.Exceptions.Auth;
using E_LearningApi.Services.Auth.CurrentUsers;
using Microsoft.EntityFrameworkCore;

namespace E_LearningApi.Services.CourseGroups
{
    public class CourseGroupService : ICourseGroupService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public CourseGroupService(ApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task CreateCourseGroupAsync(CreateCourseGroupRequest request, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            //Map Dto to entity
            var courseGroup = _mapper.Map<CourseGroup>(request);

            courseGroup.UserId = currentUser.Id;

            //Save to Database
            await _context.courseGroups.AddAsync(courseGroup, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public Task<IQueryable<CourseGroupListResponse>> GetAllAsync()
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var courseGroups = _context.courseGroups.Include(cg => cg.Enrollments)
                .ThenInclude(e => e.Course).Where(c => c.UserId == currentUser.Id).AsNoTracking();
            var courseGroupsDto = _mapper.ProjectTo<CourseGroupListResponse>(courseGroups);
            return Task.FromResult(courseGroupsDto);
        }

        public async Task<CourseGroupResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var courseGroup = await _context.courseGroups.Include(cg => cg.Enrollments).ThenInclude(e => e.Course)
                .ThenInclude(c => c.Thumbnail).Include(cg => cg.Enrollments).ThenInclude(e => e.Course).ThenInclude(c => c.Category)
                .SingleOrDefaultAsync(cg => cg.Id.Equals(id), cancellationToken);

            if (courseGroup == null)
            {
                throw new ItemNotFoundException("Course Group not found");
            }

            var courseGroupDto = _mapper.Map<CourseGroupResponse>(courseGroup);


            return courseGroupDto;
        }

        public async Task EditCourseGroupAsync(Guid id, UpdateCourseGroupRequest request, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var courseGroup = await _context.courseGroups.SingleOrDefaultAsync(c => c.Id.Equals(id), cancellationToken);
            
            if(courseGroup == null)
            {
                throw new ItemNotFoundException("Course Group not found");
            }

            //Map Dto to entity
            var newCourseGroup = _mapper.Map(request, courseGroup);

            //Save to Database
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteCourseGroupAsync(Guid id, CancellationToken cancellationToken)
        {
            var courseGroup = await _context.courseGroups.Include(cg => cg.Enrollments).SingleOrDefaultAsync(c => c.Id.Equals(id), cancellationToken);

            if (courseGroup == null)
            {
                throw new ItemNotFoundException("Course Group not found");
            }

            // Set `IsCourseInGroup` to false for all enrollments
            foreach (var enrollment in courseGroup.Enrollments)
            {
                enrollment.IsCourseInGroup = false;
                enrollment.CourseGroupId = null;
            }

            _context.Remove(courseGroup);
            await _context.SaveChangesAsync(cancellationToken);
        }


    }
}
