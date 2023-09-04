﻿using System.ComponentModel.DataAnnotations;

namespace TempoTuneAPI.Models
{
    public class Artist
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Track> Tracks { get; } = new List<Track>();


    }
}
