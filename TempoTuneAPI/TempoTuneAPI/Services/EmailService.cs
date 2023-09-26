using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;

namespace TempoTuneAPI.Services

{
    public class EmailService
    {

        private readonly string sendGridApiKey;

        public EmailService(IConfiguration configuration)
        {
            sendGridApiKey = configuration.GetSection("SendGrid:ApiKey").Value;
        }


        public async Task SendPasswordResetEmailAsync(string userEmail, string resetLink)
        {
            var client = new SendGridClient(sendGridApiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("TempoTune0@gmail.com", "TempoTune Aps"),
                Subject = "Password Reset",
                PlainTextContent = $"Click the following link to reset your password: {resetLink}",
                HtmlContent = $"<p>Click the following link to reset your password: <a href='{resetLink}'>{resetLink}</a></p>"
            };

            msg.AddTo(new EmailAddress(userEmail));

            await client.SendEmailAsync(msg);

        }
    }

}
