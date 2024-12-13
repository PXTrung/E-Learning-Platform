namespace E_LearningApi.Data.Entities
{
    public class Media
    {
        public Guid Id { get; init; } = Guid.NewGuid();

        public string Name { get; set; } = string.Empty;

        public string FileName { get; set; } = string.Empty;

        public string Extension { get; set; } = string.Empty;

        public string? UrlFilePath { get; set; }

        public string? LocalFilePath { get; set; }
    }
}
