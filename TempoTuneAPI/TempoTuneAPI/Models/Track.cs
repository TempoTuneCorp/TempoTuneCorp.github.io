using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempoTuneAPI.Models
{
    public class Track
    {
        [Key]
        

        public int Id { get; set; }
        public string Title { get; set; }
        public string SongPath { get; set; }
        public string AlbumName { get; set; }

        public int ArtistId { get; set; }
        public Artist Artist { get; set; } = null!;

    }
}
