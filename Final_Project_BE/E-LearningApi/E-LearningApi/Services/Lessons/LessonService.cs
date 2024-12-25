using AutoMapper;
using Azure.Core;
using E_LearningApi.Data;
using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Lesson;
using E_LearningApi.DTOs.Session;
using E_LearningApi.Exceptions;
using E_LearningApi.Services.Files;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using Xabe.FFmpeg;

namespace E_LearningApi.Services.Lessons
{
    public class LessonService : ILessonService
    {
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;
        private readonly ApplicationDbContext _context;

        public LessonService(IMapper mapper, ApplicationDbContext context, IFileService fileService)
        {
            _context = context;
            _mapper = mapper;
            _fileService = fileService;
        }

        public async Task CreateLessonAsync(Guid sessionId, CreateLessonRequest request, CancellationToken cancellationToken)
        {
            var session = await _context.Sessions.FirstOrDefaultAsync(s => s.Id.Equals(sessionId));

            if (session == null)
            {
                throw new ItemNotFoundException("Session of this lesson not found");
            }

            var lessonEntity = _mapper.Map<Lesson>(request);

            // Save file to folder
            var videoEntity = await _fileService.SaveFileAync(request.VideoFile, "video");
            await _context.Media.AddAsync(videoEntity);

            // Connect FK
            lessonEntity.VideoId = videoEntity.Id;

            var duration = await _fileService.GetVideoDurationAsync(videoEntity.LocalFilePath);

            lessonEntity.Duration = duration;
            lessonEntity.SessionId = sessionId;

            await _context.Lessons.AddAsync(lessonEntity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public Task<IQueryable<GetListLessons>> GetAllAsync()
        {
            var lessons = _context.Lessons
                .Include(l => l.Session)
                .Include(l => l.Video)
                .AsNoTracking();

            var lessonsDto = _mapper.ProjectTo<GetListLessons>(lessons);

            return Task.FromResult(lessonsDto);
        }

        public Task<IQueryable<GetListLessons>> GetLessionsInSessionAsync(Guid id)
        {
            var lessons = _context.Lessons.Where(s => s.SessionId.Equals(id)).OrderBy(s => s.CreatedAt).AsNoTracking();
            var lessonsDto = _mapper.ProjectTo<GetListLessons>(lessons);

            // return a Task that wraps the IQueryable<GetListLevels>
            return Task.FromResult(lessonsDto);
        }

        public async Task<GetLessonResponse> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var lesson = await _context.Lessons
                .Include(l => l.Session)
                .Include(l => l.Video)
                .FirstOrDefaultAsync(l => l.Id.Equals(id), cancellationToken);

            if (lesson == null)
            {
                throw new ItemNotFoundException("Lesson not found");
            }

            var lessonDto = _mapper.Map<GetLessonResponse>(lesson);

            return lessonDto;
        }

        public async Task UpdateLessonAsync(Guid id, UpdateLessonRequest request, CancellationToken cancellationToken)
        {
            var lesson = await _context.Lessons
                .Include(l => l.Session)
                .Include(l => l.Video)
                .FirstOrDefaultAsync(l => l.Id.Equals(id), cancellationToken);

            if (lesson == null)
            {
                throw new ItemNotFoundException("Lesson not found");
            }

            _mapper.Map(request, lesson);

            if (request.VideoFile != null)
            {
                await _fileService.UpdateFileAsync(request.VideoFile, "video", lesson.Video);
            }

            lesson.Duration = await _fileService.GetVideoDurationAsync(lesson.Video.LocalFilePath);
            lesson.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteLessonAsync(Guid id, CancellationToken cancellationToken)
        {
            var lesson = await _context.Lessons.FirstOrDefaultAsync(l => l.Id.Equals(id), cancellationToken);

            if (lesson == null)
            {
                throw new ItemNotFoundException("Lesson not found");
            }

            _context.Remove(lesson);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
