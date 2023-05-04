namespace TempoTuneAPI.Models
{
    public class Favourite
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Track Track { get; set; }


    }
}
