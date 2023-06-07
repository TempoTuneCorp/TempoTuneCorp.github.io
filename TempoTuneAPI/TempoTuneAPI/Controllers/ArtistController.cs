using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TempoTuneAPI.Models;
using TempoTuneAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace TempoTuneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly TempoTuneDbContext _context;

        public ArtistController(TempoTuneDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllArtists")]
        public async Task<IEnumerable<Artist>> GetArtists()
        {
            return await _context.Artists.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var artist = await _context.Artists.FindAsync(id);

            if (artist == null)
                { return NotFound(); }
            else
                { return Ok(artist); }

        }

        [HttpPost("AddArtist")]
        public async Task<IActionResult> Create(Artist artist)
        {
            if (artist != null)
                try
                {
                    _context.Artists.Add(artist);
                    await _context.SaveChangesAsync();
                    //return Ok(artist);
                }
                catch (Exception ex)
                {
                   return BadRequest(ex.Message);
                }
            return Ok(artist);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            var artistToDelete = await _context.Artists.FindAsync(id);
            if (artistToDelete == null)
            { return NotFound(); }
            else
            {
                _context.Artists.Remove(artistToDelete);
                await _context.SaveChangesAsync();
            }
            return Ok(artistToDelete);
            
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Artist artistObj)
        {
            if (id != artistObj.Id) return BadRequest();
            
            _context.Entry(artistObj).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();

        }







    }
}
