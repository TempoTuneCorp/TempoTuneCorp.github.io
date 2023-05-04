namespace TempoTuneAPI.Models
{
    public class Track
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string SongPath { get; set; }
        public string AlbumName { get; set; }
        public Artist Artist { get; set; }

    }
}
