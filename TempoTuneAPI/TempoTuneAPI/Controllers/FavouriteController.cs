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
        public async Task<IActionResult> GetAllFavorites()
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
                             select new
                             {
                                 Id = f.Id,
                                 User = f.User,
                                 Track = f.Track

                             }).FirstOrDefault();

            } 


            return Ok(allList);
        }

        [HttpGet("GetFavByUser{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllFavByUserID(int id)
        {

            var allList = await _context.Favourites.ToListAsync();
            var user = await _context.Users.FindAsync(id);
            var newList = new List<Favourite>();


            foreach (var item in allList)
            {
                        var track = (from f in _context.Favourites
                                     join t in _context.Tracks on f.Id equals t.Id
                                     into x
                                     from rt in x.DefaultIfEmpty()
                                     where f.Id == item.Id
                                     orderby f.Id
                                     select new
                                     {
                                         Id = f.Id,
                                         User = f.User,
                                         Track = f.Track

                                     }).FirstOrDefault();
              }
            foreach (var item in allList)
            {
                if (item.User == user)
                {
                    newList.Add(item);
                }
            }

            return Ok(newList);
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

        [HttpPost("AddFavourite")]
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
       

      
    }
}
