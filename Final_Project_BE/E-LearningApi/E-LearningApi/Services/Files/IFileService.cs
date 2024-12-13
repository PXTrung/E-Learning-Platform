using E_LearningApi.Data.Entities;

namespace E_LearningApi.Services.Files
{
    public interface IFileService
    {
        Task<Media> SaveFileAync(IFormFile? file, string folderName);

        Task UpdateFileAsync(IFormFile? file, string folderName, Media oldFile);

        Task<TimeSpan> GetVideoDurationAsync(string filePath);

        public void DeleteFile(string filePath);
    }
}
