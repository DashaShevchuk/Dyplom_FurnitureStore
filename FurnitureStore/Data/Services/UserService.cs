using FurnitureStore.Data.Interfaces.UserInterfaces;
using FurnitureStore.Data.Models.UserModels;
using FurnitureStore.Services;
using System.Net;

namespace FurnitureStore.Data.Services
{
    public class UserService : IUserService
    {
        private readonly IEmailSender emailSender;
        public UserService(IEmailSender _emailSender)
        {
            emailSender = _emailSender;
        }
        public HttpStatusCode SendEmail(FeedbackModel model)
        {
            emailSender.SendEmail(model);
            return HttpStatusCode.OK;
        }
    }
}
