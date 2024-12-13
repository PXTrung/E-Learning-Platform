using E_LearningApi.Common;
using E_LearningApi.Data;
using E_LearningApi.Data.Entities;
using E_LearningApi.Exceptions;
using Microsoft.EntityFrameworkCore;
using Xabe.FFmpeg;

namespace E_LearningApi.Services.Files
{
    public class FileServices : IFileService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ApplicationDbContext _context;

        public FileServices(IWebHostEnvironment hostEnvironment, IHttpContextAccessor contextAccessor, ApplicationDbContext context)
        {
            _environment = hostEnvironment;
            _contextAccessor = contextAccessor;
            _context = context;
            Environment.SetEnvironmentVariable("PATH", Environment.GetEnvironmentVariable("PATH") + @";C:\ffmpeg\bin");
        }


        public async Task<Media> SaveFileAync(IFormFile file, string folderName)
        {
            var fileDetails = ValidateFile(file);

            if (fileDetails == null)
            {
                throw new ItemNotValidException("Invalid File!");
            }

            var physicalPath = await SaveFileAndCreatePath(file, folderName, fileDetails.FileFullName);

            var newMedia = new Media
            {
                Name = fileDetails.FileName,
                FileName = fileDetails.FileGuidName,
                Extension = fileDetails.FileExtension,
                LocalFilePath = physicalPath,
                UrlFilePath = GetFileUrl(folderName, fileDetails.FileFullName)
            };

            return newMedia;
        }

        public async Task UpdateFileAsync(IFormFile file, string folderName, Media oldFile)
        {
            var fileDetails = ValidateFile(file);

            if (fileDetails == null)
            {
                throw new ItemNotValidException("Invalid File!");
            }

            DeleteFile(oldFile.LocalFilePath);

            var physicalPath = await SaveFileAndCreatePath(file, folderName, fileDetails.FileFullName);

            oldFile.Name = fileDetails.FileName;
            oldFile.FileName = fileDetails.FileGuidName;
            oldFile.Extension = fileDetails.FileExtension;
            oldFile.LocalFilePath = physicalPath;
            oldFile.UrlFilePath = GetFileUrl(folderName, fileDetails.FileFullName);
        }

        public async Task<TimeSpan> GetVideoDurationAsync(string filePath)
        {
            var mediaInfo = await FFmpeg.GetMediaInfo(filePath);
            var duration = mediaInfo.Duration;

            // Truncate the duration to remove the extra precision
            return new TimeSpan(duration.Hours, duration.Minutes, duration.Seconds);
        }

        public void DeleteFile(string filePath)
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }

        private async Task<string> SaveFileAndCreatePath(IFormFile file, string folderName, string fileFullName)
        {

            var physicalFolderPath = EnsureFolderExist(folderName);

            var physicalPath = await SaveFileToFolderAsync(file, physicalFolderPath, fileFullName);

            return physicalPath;
        }

        private FileDetails? ValidateFile(IFormFile file)
        {
            if (file == null || file?.Length <= 0) return null;

            var fileNameString = file.FileName;

            if (string.IsNullOrEmpty(fileNameString)) return null;

            // Check Extension of the file
            string[] arrayExtension = fileNameString.Split('.');

            if (arrayExtension.Length < 0)
            {
                return null;
            }

            for (int i = 0; i < arrayExtension.Length; i++)
            {
                var ext = arrayExtension[i];
                if (Constants.INVALID_EXTENSIONS.Contains(ext)) return null;
            }

            var fileGuidName = Guid.NewGuid().ToString();
            var fileName = arrayExtension[0];
            var fileExtension = arrayExtension[arrayExtension.Length - 1];

            // Create new file
            var fullFileName = fileGuidName + "." + fileExtension;

            return new FileDetails(fileGuidName, fileName, fileExtension, fullFileName);
        }

        private string EnsureFolderExist(string folderName)
        {
            var webRoot = _environment.WebRootPath.Normalize();

            var physicalFolderPath = Path.Combine(webRoot, folderName);

            //Only using to solve the non-existed directory
            if (!Directory.Exists(physicalFolderPath))
            {
                Directory.CreateDirectory(physicalFolderPath);
            }

            return physicalFolderPath;
        }

        private async Task<string> SaveFileToFolderAsync(IFormFile file, string physicalFolderPath, string fullFileName)
        {
            //Create the actual path for storing uploaded file on the server
            var physicalPath = Path.Combine(physicalFolderPath, fullFileName);
            //Using stream to copy into
            await using (var stream = System.IO.File.Create(physicalPath))
            {
                await file.CopyToAsync(stream);
            }

            return physicalPath;
        }

        public string GetFileUrl(string folderName, string fileName)
        {
            var baseUrl = $"{_contextAccessor.HttpContext.Request.Scheme}://{_contextAccessor.HttpContext.Request.Host}{_contextAccessor.HttpContext.Request.PathBase}";
            return $"{baseUrl}/{folderName}/{fileName}";
        }
    }

    public class FileDetails
    {
        public FileDetails(string fileGuidName, string fileName, string fileExtension, string fileFullName)
        {
            FileGuidName = fileGuidName;
            FileName = fileName;
            FileExtension = fileExtension;
            FileFullName = fileFullName;
        }

        public string FileGuidName { get; set; }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public string FileFullName { get; set; }
    }
}
