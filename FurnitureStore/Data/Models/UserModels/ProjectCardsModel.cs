using System.Collections.Generic;

namespace FurnitureStore.Data.Models.UserModels
{
    public class ProjectCardsModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<string> ProjectImages { get; set; }
    }
}
