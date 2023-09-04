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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Artist>().ToTable("Artists")
                .HasMany(e => e.Tracks)
                .WithOne(e => e.Artist)
                .HasForeignKey(e => e.ArtistId)
                .IsRequired();
                
            modelBuilder.Entity<Track>().ToTable("Tracks");
            modelBuilder.Entity<Favourite>().ToTable("Favourites");
        }
    }
}
