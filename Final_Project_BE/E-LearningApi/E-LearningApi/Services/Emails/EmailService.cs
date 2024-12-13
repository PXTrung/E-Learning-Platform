using System.Net.Mail;
using System.Net;

namespace E_LearningApi.Services.Emails
{
    public class EmailService : IEmailService
    {
        private readonly string _smtpServer = "smtp.gmail.com";
        private readonly int _smtpPort = 587;
        private readonly string _smtpUsername = "trungspring@gmail.com";
        private readonly string _smtpPassword = "cjls hpgr iajl zkmp";
        private readonly SmtpClient _client;


        public EmailService()
        {
            _client = new SmtpClient
            {
                Host = _smtpServer,
                Port = _smtpPort,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_smtpUsername, _smtpPassword)
            };
        }


        public Task SendEmail(string toEmailAddress, string subject, string message)
        {
            var mail = new MailMessage(from: _smtpUsername, to: toEmailAddress)
            {
                Subject = subject,
                Body = $"{message}",
                IsBodyHtml = true,

            };
            return _client.SendMailAsync(mail);
        }
    }
}
