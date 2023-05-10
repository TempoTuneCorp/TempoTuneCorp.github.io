using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TempoTuneAPI.Data;
using TempoTuneAPI.Models;

namespace TempoTuneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TempoTuneDbContext context;

        //Constructor
        public UserController(TempoTuneDbContext context)
        {
            this.context = context;
        }


        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userObj.UserName && x.Password == userObj.Password);
            if (user == null)
            {
                return NotFound(new { Message = "user not found" });
            }

            return Ok(new { Message = "login success" });

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User userObj)
        {
            if (userObj == null)
            {
                BadRequest();
            }

            await context.Users.AddAsync(userObj);
            await context.SaveChangesAsync();
            return Ok(new { Message = "User registered" });



        }


        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, User userObj)
        {
            if (id != userObj.Id) return BadRequest();

            context.Entry(userObj).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userToDelete = await context.Users.FindAsync(id);
            if (userToDelete == null) return NotFound();

            context.Users.Remove(userToDelete);
            await context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);

        }

        //[HttpPost]
        //[ProducesResponseType(StatusCodes.Status201Created)]
        //public async Task<IActionResult> Create(User user)
        //{
        //    await context.Users.AddAsync(user);
        //    await context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        //}

    }
}
