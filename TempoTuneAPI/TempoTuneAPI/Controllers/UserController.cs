using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TempoTuneAPI.Data;
using TempoTuneAPI.Helpers;
using TempoTuneAPI.Models;

namespace TempoTuneAPI.Controllers
{
    [Route("api/[controller]")]
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


            user.Token = CreateJwt(user);

            return Ok(new
            {
                Token = user.Token,
                Message = "Login Success!"
            });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
             if (userObj == null)
                return BadRequest();
             
            if (await CheckUserNameAndEmailExistsAsync(userObj.UserName, userObj.Email))               
                return BadRequest(new { Message = "Username and Email already exists" });

             //Check om username eksisterer
             if (await CheckUserNameExistsAsync(userObj.UserName))
                   return BadRequest(new {Message = "Username already exists"});


             //Check om Email eksisterer
             if (await CheckEmailExistsAsync(userObj.Email))
                   return BadRequest(new {Message = "Email already exists"});

            

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




    

        [HttpGet("id")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);

        }




        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, User userObj)
        {
            if (id != userObj.Id) return BadRequest();

            _context.Entry(userObj).State = EntityState.Modified;
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
        private async Task<bool> CheckUserNameAndEmailExistsAsync(string username, string email)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username && x.Email == email);
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


        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.UserName)

            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        [HttpGet]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await _context.Users.ToListAsync());
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
