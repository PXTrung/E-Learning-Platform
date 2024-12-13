namespace E_LearningApi.Services.Emails
{
    public interface IEmailService
    {
        Task SendEmail(string toEmailAddress, string subject, string message);
    }
}
