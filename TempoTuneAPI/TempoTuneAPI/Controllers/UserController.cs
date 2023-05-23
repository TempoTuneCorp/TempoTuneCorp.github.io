using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TempoTuneAPI.Data;
using TempoTuneAPI.Helpers;
using TempoTuneAPI.Models;

namespace TempoTuneAPI.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TempoTuneDbContext _context;

        //Constructor
        public UserController(TempoTuneDbContext context)
        {
            _context = context;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userObj.UserName);

            if (user == null)
                return NotFound(new { Message = "User not found" });

            if(!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                return BadRequest(new {Message = "Password is incorrect"});
            }

            return Ok(new
            {
                Message = "Login Success!"
            });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();
             
             //Check om username eksisterer
             if (await CheckUserNameExistsAsync(userObj.UserName))
                   return BadRequest(new {Message = "Username exists"});


             //Check om Email eksisterer
             if (await CheckEmailExistsAsync(userObj.Email))
                   return BadRequest(new {Message = "Email exists"});


             //Check Password Strength
             var pass = CheckPasswordStrength(userObj.Password);
             if(!string.IsNullOrEmpty(pass))
                 return BadRequest(new {Message = pass.ToString()}  );


            userObj.Password = PasswordHasher.HashPassword(userObj.Password);

            await _context.Users.AddAsync(userObj);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered"
            });

        }




        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("id")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, User user)
        {
            if (id != user.Id) return BadRequest();

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userToDelete = await _context.Users.FindAsync(id);
            if (userToDelete == null) return NotFound();

            _context.Users.Remove(userToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> CheckUserNameExistsAsync(string username)
        {
            return await _context.Users.AnyAsync(x=>x.UserName == username);
        }

        private async Task<bool> CheckEmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }

        private string CheckPasswordStrength(string Password)
        {
            StringBuilder sb = new StringBuilder();
            if(Password.Length < 8)
               sb.Append("Your password should be atleast 8 characters"+Environment.NewLine);

            if(!(Regex.IsMatch(Password, "[a-z]") && Regex.IsMatch(Password, "[A-Z]") && Regex.IsMatch(Password, "[0-9]")))
               sb.Append("Password should be Alpha Numeric"+ Environment.NewLine);
               if(!Regex.IsMatch(Password, "[<,>,!,$,@,$,£,€]"));
               
                 return sb.ToString();
            
        }
    }
}
