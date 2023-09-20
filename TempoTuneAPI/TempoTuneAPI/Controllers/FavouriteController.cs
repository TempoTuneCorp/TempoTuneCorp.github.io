using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using TempoTuneAPI.Data;
using TempoTuneAPI.Models;
using Xunit;

namespace TempoTuneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouriteController : ControllerBase
    {
        private readonly TempoTuneDbContext _context;

        public FavouriteController(TempoTuneDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllFavourites")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IEnumerable<Favourite>> GetAllFavorites()
        {
            var allList = await _context.Favourites.ToListAsync();


            foreach (var item in allList)
            {
                var track = (from f in _context.Favourites
                             join t in _context.Tracks on f.Id equals t.Id
                             into x
                             from rt in x.DefaultIfEmpty()
                             where f.Id == item.Id
                             orderby f.Id
                             select new Favourite
                             {
                                 Id = f.Id,
                                 User = f.User,
                                 Track = f.Track

                             }).ToList();

            }


            return allList;
        }

        [HttpGet("GetFavSongsByUser{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IEnumerable<Track>> GetFavSongsByUserID(int id)
        {


            var user = await _context.Users.FindAsync(id);
            var listOfFavID = new List<int>();
            var allListFav = new List<Favourite>();
            allListFav = (List<Favourite>)await GetAllFavorites();
            var newFavList = new List<Track>();

            var tracks = (from t in _context.Tracks
                          join od in _context.Artists on t.Id equals od.Id
                          into x
                          from rt in x.DefaultIfEmpty()
                          orderby t.Id
                          select new Track()
                          {
                              Id = t.Id,
                              Title = t.Title,
                              SongPath = t.SongPath,
                              AlbumName = t.AlbumName,
                              Time = t.Time,
                              Artist = new Artist { Name = t.Artist.Name, Id = t.Artist.Id }


                          }).ToList();


            foreach (var item in allListFav)
            {
                if (item.User == user)
                {
                    listOfFavID.Add(item.Track.Id);
                }
            }

            foreach (var item in tracks)
            {
                if (listOfFavID.Contains(item.Id))
                {
                    newFavList.Add(item);
                }
            }

            return newFavList;
        }


        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetById(int id)
        {
            var track = (from f in _context.Favourites
                         join t in _context.Tracks on f.Id equals t.Id
                         into x
                         from rt in x.DefaultIfEmpty()
                         where f.Id == id
                         orderby f.Id
                         select new
                         {
                             Id = f.Id,
                             User = f.User,
                             Track = f.Track

                         }).FirstOrDefault();
            return Ok(track);

        }


        [HttpPost("AddFavourite/{userId}/{trackId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create(int userId, int trackId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            { return NotFound(); }

            var track = await _context.Tracks.FindAsync(trackId);
            if (track == null)
            { return NotFound(); }

            try
            {
                var favorite = new Favourite
                {
                    User = user,
                    Track = track
                };

                 await _context.Favourites.AddAsync(favorite);
                 await _context.SaveChangesAsync();
                
                return Ok(favorite);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpDelete("DeleteFavourite")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int favId)
        {
            var favToDelete = await _context.Favourites.FindAsync(favId);
            if (favToDelete == null)
            { return NotFound(); }
            try
            {
                _context.Favourites.Remove(favToDelete);
                await _context.SaveChangesAsync();

                return Ok(favToDelete);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpGet("IsSongFav/{userId}/{trackId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<bool> IsSongFav(int userId, int trackId)
        {
            //getting favorite tracks by user:
            var user = await _context.Users.FindAsync(userId);
            var listOfFavID = new List<int>();
            var allListFav = new List<Favourite>();
            allListFav = (List<Favourite>)await GetAllFavorites();
            var newFavList = new List<Track>();

            var tracks = (from t in _context.Tracks
                          join od in _context.Artists on t.Id equals od.Id
                          into x
                          from rt in x.DefaultIfEmpty()
                          orderby t.Id
                          select new Track()
                          {
                              Id = t.Id,
                              Title = t.Title,
                              SongPath = t.SongPath,
                              AlbumName = t.AlbumName,
                              Time = t.Time,
                              Artist = new Artist { Name = t.Artist.Name, Id = t.Artist.Id }


                          }).ToList();

            foreach (var item in allListFav)
            {
                if (item.User == user)
                {
                    listOfFavID.Add(item.Track.Id);
                }
            }

            foreach (var item in tracks)
            {
                if (listOfFavID.Contains(item.Id))
                {
                    newFavList.Add(item);
                }
            }

            foreach (var item in newFavList)
            {
                if(item.Id== trackId) 
                {
                    return true;
                }
            }

            return false;

        }



        [HttpGet("GetFavByUser/{userId}")]
        public async Task<IEnumerable<Favourite>> GetFavByUser(int userId)
        {
            var AllFavorite = await _context.Favourites.ToListAsync();
            var sortedList = new List<Favourite>();

            foreach (var item in AllFavorite)
            {
                
                
                var track = (from f in _context.Favourites
                             join t in _context.Tracks on f.Id equals t.Id
                             into x
                             from rt in x.DefaultIfEmpty()
                             where f.Id == item.Id
                             orderby f.Id
                             select new Favourite
                             {
                                 Id = f.Id,
                                 User = f.User,
                                 Track = f.Track
                                 
                             }).ToList();
            }

            foreach (var fav in AllFavorite)
            {
                if(fav.User.Id == userId) 
                { sortedList.Add(fav); }
            }


            return sortedList;
        }


        [HttpDelete("DeleteFavByUserAndID/{userId}/{trackId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteFavByUserAndID(int userId, int trackId)
        {
            var UserFavList = await GetFavByUser(userId);
            var deltedThings = false;
            var amount = 0;

            foreach (var item in UserFavList)
            {
                if(item.Track.Id == trackId) 
                {
                   await Delete(item.Id);
                    amount++;
                    deltedThings = true;

                }
            }

            if (deltedThings) 
            { return Ok(new { Message = amount + " deleted item" }); }

            return Ok(new { Message = "no items deleted" });
        }



        [HttpDelete("DeleteAllFavByUserID/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAllFavByUserID(int userId) 
        {
            var UserFavList = await GetFavByUser(userId);
            var deltedThings = false;
            var amount = 0;

            foreach (var item in UserFavList)
            {
                    await Delete(item.Id);
                    amount++;
                    deltedThings = true;
            }

            if (deltedThings)
            { return Ok(new { Message = amount + " deleted item" }); }

            return Ok(new { Message = "no items deleted" });

            throw new NotImplementedException();
        }


    }
}
