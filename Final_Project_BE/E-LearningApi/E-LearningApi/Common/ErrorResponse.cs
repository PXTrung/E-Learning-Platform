namespace E_LearningApi.Common
{
    public class ErrorResponse
    {
        public string Title { get; set; } = string.Empty;

        public string? Type { get; set; }

        public int StatusCode { get; set; }
        public string? Message { get; set; }

    }
}
