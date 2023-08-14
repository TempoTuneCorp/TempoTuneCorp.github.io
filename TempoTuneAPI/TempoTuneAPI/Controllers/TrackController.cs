using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TempoTuneAPI.Models;
using TempoTuneAPI.Data;
using System.Collections;

namespace TempoTuneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackController : ControllerBase
    {
        private readonly TempoTuneDbContext _context;

        public TrackController(TempoTuneDbContext context)
        {
            _context = context;
        }




         [HttpPost("AddTrack")]
         [ProducesResponseType(typeof(Track), StatusCodes.Status200OK)]
         [ProducesResponseType(StatusCodes.Status404NotFound)]
         public async Task<IActionResult> Create(Track track)
        {
            try
            {

                _context.Tracks.Add(track);
               
                await _context.SaveChangesAsync();
                return Ok(track);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


         [HttpDelete("DeleteTrack")]
        [ProducesResponseType(typeof(Track), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Track track)
        {

            try
            {
                _context.Tracks.Remove(track);
                await _context.SaveChangesAsync();
                return Ok(track);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Track), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var track1 = await _context.Tracks.FindAsync(id);
            if (track1 == null)
            {
                return NotFound();
            }
            else
            {
                var track = (from t in _context.Tracks
                             join od in _context.Artists on t.Id equals od.Id
                             into x
                             from rt in x.DefaultIfEmpty()
                             where t.Id == id
                             orderby t.Id
                             select new Track()
                             {
                                 Id = t.Id,
                                 Title = t.Title,
                                 SongPath = t.SongPath,
                                 AlbumName = t.AlbumName,
                                 Artist = t.Artist,
                                 Url = t.Url
                             }).FirstOrDefault(); 

                return Ok(track);
            }

        }



        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, Track trackObj)
        {
           if (id != trackObj.Id) return BadRequest();

           _context.Entry(trackObj).State = EntityState.Modified;
           await _context.SaveChangesAsync();

           return Ok();
        }


        [HttpGet("GetAllTracks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IEnumerable<Track> GetTracks()
        {
            var testTrack = (from t in _context.Tracks
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
                                Artist = t.Artist,
                                Url = t.Url
                             }).ToList();
            return testTrack;
        }


      
    }
}
