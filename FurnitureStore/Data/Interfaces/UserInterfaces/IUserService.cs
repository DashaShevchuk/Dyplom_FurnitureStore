using FurnitureStore.Data.Models.UserModels;
using System.Net;

namespace FurnitureStore.Data.Interfaces.UserInterfaces
{
    public interface IUserService
    {
        public HttpStatusCode SendEmail(FeedbackModel model);
    }
}
