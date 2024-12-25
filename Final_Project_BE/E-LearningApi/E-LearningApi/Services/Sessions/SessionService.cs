using AutoMapper;
using E_LearningApi.Data;
using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Level;
using E_LearningApi.DTOs.Session;
using E_LearningApi.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace E_LearningApi.Services.Sessions
{
    public class SessionService : ISessionService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        public SessionService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateSessionAsync(Guid id, CreateSessionRequest request, CancellationToken cancellationToken)
        {
            var course = _context.Courses.FirstOrDefault(c => c.Id.Equals(id));
            
            if (course == null)
            {
                throw new ItemNotFoundException("Course of this session not found");
            }

            //Map Dto to entity
            var session = _mapper.Map<Session>(request);
            session.CourseId = id;

            //Save to Database
            await _context.Sessions.AddAsync(session, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task UpdateSessionAsync(Guid id, UpdateSessionRequest request, CancellationToken cancellationToken)
        {
            var session = await _context.Sessions.FirstOrDefaultAsync(c => c.Id.Equals(id), cancellationToken);

            if (session == null)
            {
                throw new ItemNotFoundException("Session not found");
            }

            // Map Dto to Entity
            var newSession = _mapper.Map(request, session);
            newSession.UpdatedAt = DateTime.UtcNow;

            // Save to Database
            await _context.SaveChangesAsync(cancellationToken);
        }

        public Task<IQueryable<GetListSessions>> GetAllAsync()
        {
            var sessions = _context.Sessions.AsNoTracking();
            var sessionsDto = _mapper.ProjectTo<GetListSessions>(sessions);

            // return a Task that wraps the IQueryable<GetListLevels>
            return Task.FromResult(sessionsDto);
        }

        public Task<IQueryable<GetListSessions>> GetSessionsInCourseAsync(Guid id)
        {
            var sessions = _context.Sessions.Where(s => s.CourseId.Equals(id)).OrderBy(s => s.CreatedAt).AsNoTracking();
            var sessionsDto = _mapper.ProjectTo<GetListSessions>(sessions);

            // return a Task that wraps the IQueryable<GetListLevels>
            return Task.FromResult(sessionsDto);
        }

        public async Task<GetSessionResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var session = await _context.Sessions.FirstOrDefaultAsync(c => c.Id.Equals(id), cancellationToken);

            if (session == null)
            {
                throw new ItemNotFoundException("Session not found");
            }

            var sessionDto = _mapper.Map<GetSessionResponse>(session);


            return sessionDto;
        }

        public async Task DeleteSessionAsync(Guid id, CancellationToken cancellationToken)
        {
            var session = await _context.Sessions.FirstOrDefaultAsync(c => c.Id.Equals(id), cancellationToken);

            if(session == null)
            {
                throw new ItemNotFoundException("Session not found");
            }

            _context.Remove(session);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
