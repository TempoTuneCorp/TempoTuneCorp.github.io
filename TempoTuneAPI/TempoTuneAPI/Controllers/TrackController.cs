using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TempoTuneAPI.Models;
using TempoTuneAPI.Data;
using System.Collections;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPutAttribute = Microsoft.AspNetCore.Mvc.HttpPutAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using HttpDeleteAttribute = Microsoft.AspNetCore.Mvc.HttpDeleteAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

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

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public byte[] GetFilesFromTracks(int id)
        {
            var track = _context.Tracks.FindAsync(id);
            string path = Environment.CurrentDirectory + ("/Songs/") + id + ".mp3";

            //converting Track file into bytes array
            byte[] audiobyte = System.IO.File.ReadAllBytes(path);


            return audiobyte;


        }
        /*
            public HttpResponseMessage GetFilesFromTracks(int id)
            {
                var track = _context.Tracks.FindAsync(id);
                string path = Environment.CurrentDirectory + ("/Songs/") + id+".mp3";


                //converting Track file into bytes array
                byte[] audiobyte = System.IO.File.ReadAllBytes(path);

                //adding bytes to memory stream
                var dataStream = new MemoryStream(audiobyte);

                //adding memoryStream to object to the HttpResponseMessage Content
                HttpResponseMessage httpResponseMessage = new(HttpStatusCode.OK);
                httpResponseMessage.Content = new StreamContent(dataStream);

                //Modifiying the headers
                httpResponseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                httpResponseMessage.Content.Headers.ContentDisposition.FileName = id.ToString();
                httpResponseMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/mp3");

                //recreating AudioFile
                string path2 = "C:/Users/rms/Desktop/Songs";
                using (var byteToImage = new FileStream(path2 + "\\" + id +".mp3", FileMode.Create))
                {
                    byteToImage.Write(audiobyte, 0, audiobyte.Length);//pass byte array here
                }


                return httpResponseMessage;
                

        }
            */


    }
}
