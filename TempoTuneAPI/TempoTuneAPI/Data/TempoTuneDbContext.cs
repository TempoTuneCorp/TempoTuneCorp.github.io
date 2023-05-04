using Microsoft.EntityFrameworkCore;
using TempoTuneAPI.Models;

namespace TempoTuneAPI.Data
{
    public class TempoTuneDbContext : DbContext

    {
        public TempoTuneDbContext(DbContextOptions<TempoTuneDbContext> options)
            : base(options)
        {

        }

        public DbSet<Artist> Artists { get; set; }
        public DbSet<Favourite> Favourites { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
