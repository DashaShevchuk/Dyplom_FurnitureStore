using System;
using FurnitureStore.Data.Models.UserModels;
using System.Net.Mail;
using System.Net;

namespace FurnitureStore.Services
{
    public interface IEmailSender
    {
        void SendEmail(FeedbackModel model);
    }

    public class EmailSender : IEmailSender
    {

        public void SendEmail(FeedbackModel model)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.UseDefaultCredentials = false;
            smtpClient.EnableSsl = true;
            smtpClient.Credentials = new NetworkCredential("furniture.store.mspace@gmail.com", "gtbirgxvyaejnusv");

            var mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("furniture.store.mspace@gmail.com");
            mailMessage.To.Add("furniture.store.mspace@gmail.com");
            mailMessage.Subject = "Повідомлення з сайту";
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = $"Ім'я: {model.Name}<br>" +
                                      $"Email: {model.Email}<br>" +
                                      $"Телефон: {model.Phone}<br>" +
                                      $"Цікавить: {model.Category}<br>" +
                                      $"Примітка: {model.Note}";

            try
            {
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                
            }
            finally
            {
                smtpClient.Dispose();
            }
        }
    }
}