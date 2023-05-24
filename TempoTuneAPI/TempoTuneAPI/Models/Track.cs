using System.ComponentModel.DataAnnotations;

namespace TempoTuneAPI.Models
{
    public class Track
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string SongPath { get; set; }
        public string AlbumName { get; set; }
        public Artist Artist { get; set; }

    }
}
