using System.ComponentModel.DataAnnotations;

namespace TempoTuneAPI.Models
{
    public class Favourite
    {
        [Key]
        public int Id { get; set; }
        public User User { get; set; }
        public Track Track { get; set; }


    }
}
