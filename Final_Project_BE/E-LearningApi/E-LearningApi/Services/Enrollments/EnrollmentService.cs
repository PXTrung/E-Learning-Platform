using AutoMapper;
using E_LearningApi.Data;
using E_LearningApi.DTOs.Category;
using E_LearningApi.DTOs.Enrollment;
using E_LearningApi.Exceptions;
using E_LearningApi.Exceptions.Auth;
using E_LearningApi.Services.Auth.CurrentUsers;
using Microsoft.EntityFrameworkCore;

namespace E_LearningApi.Services.Enrollments
{
    public class EnrollmentService : IEnrollmentService
    {

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public EnrollmentService(ApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public Task<IQueryable<EnrollmentListResponse>> GetAllAsync()
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var enrollments = _context.Enrollments.Include(e => e.Course).Where(e => e.UserId.Equals(currentUser.Id)).AsNoTracking();
            var enrollmentsDto = _mapper.ProjectTo<EnrollmentListResponse>(enrollments);
            return Task.FromResult(enrollmentsDto);
        }

        public async Task<EnrollmentResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserService.GetCurrentUser();
            if (currentUser == null)
            {
                throw new UnauthenticationException("You must login first");
            }

            var enrollment = await _context.Enrollments.Include(e => e.Course).ThenInclude(c => c.Thumbnail).Include(e => e.Course).ThenInclude(c => c.Category).SingleOrDefaultAsync(c => c.Id.Equals(id), cancellationToken);

            if (enrollment == null)
            {
                throw new ItemNotFoundException("Course not found");
            }

            var enrollmentDto = _mapper.Map<EnrollmentResponse>(enrollment);


            return enrollmentDto;
        }

        public async Task AddEnrollmentToGroupAsync(AddEnrollmentRequest request)
        {
            var courseGroup = await _context.courseGroups.SingleOrDefaultAsync(c => c.Id.Equals(request.courseGroupId));
            var enrollment = await _context.Enrollments.SingleOrDefaultAsync(c => c.Id.Equals(request.enrollmentId));

            if (courseGroup == null || enrollment == null)
                throw new ItemNotFoundException("CourseGroup or Enrollment not found");

            enrollment.CourseGroupId = request.courseGroupId;
            enrollment.IsCourseInGroup = true;

            await _context.SaveChangesAsync();
        }

        public async Task RemoveEnrollmentFromGroupAsync(RemoveEnrollmentRequest request)
        {
            var enrollment = await _context.Enrollments
                .SingleOrDefaultAsync(e => e.Id == request.enrollmentId && e.CourseGroupId == request.courseGroupId);

            if (enrollment == null) throw new ItemNotFoundException("Enrollment not found");

            enrollment.CourseGroupId = null;
            enrollment.IsCourseInGroup = false;

            await _context.SaveChangesAsync();
        }
    }
}
