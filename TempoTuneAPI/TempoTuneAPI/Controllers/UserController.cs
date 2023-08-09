using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
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
                 return BadRequest(new {Message = pass.ToString()});

            if (!isValidEmail(userObj.Email))
                return BadRequest(new { Message = "Email must be right format: a1@b2.c3" });

            //if (!isValidEmail(userObj.Email))
            //    return BadRequest(new { Message = "Email must be the right format" });


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




        [HttpPut("updateUsername")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateUsername(User UserObj)
        {

           System.Diagnostics.Debug.Print("##################\n" + UserObj.Id + "\n###############");

            //var user = await _context.Users.FindAsync(userObj.Id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserObj.Id);
            if (user == null)
                return BadRequest(new { Message = "User not found" });

           

            if (await CheckUserNameExistsAsync(UserObj.UserName))
                return BadRequest(new { Message = "Username already exists" });



            user.UserName = UserObj.UserName;
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            user.Token = CreateJwt(user);
            
            return Ok(new
            {
                Token = user.Token,
                Message = "Your username was updated succesfully"
            });
            //return NoContent();

            
        }

        [HttpPut("updateEmail")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateEmail(User UserObj)
        {

            System.Diagnostics.Debug.Print("##################\n" + UserObj.Id + "\n###############");

            //var user = await _context.Users.FindAsync(userObj.Id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserObj.Id);
            if (user == null)
                return BadRequest(new { Message = "User not found" });


            if (await CheckEmailExistsAsync(UserObj.Email))
                return BadRequest(new { Message = "Email already exists" });

            if (!isValidEmail(user.Email))
                return BadRequest(new { Message = "Email must be the right format: a1@b2.c3" });

            user.Email = UserObj.Email;
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            user.Token = CreateJwt(user);

            return Ok(new
            {
                Token = user.Token,
                Message = "Your email was updated succesfully"
            });
            //return NoContent();


        }

        [HttpDelete("deleteUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int id)
        {
            
            
            var userToDelete = await _context.Users.FindAsync(id);
            System.Diagnostics.Debug.Print("################\n" + id + "\n################");
            if (userToDelete == null) return NotFound(new { Message = "User not found" });          
            _context.Users.Remove(userToDelete);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User was deleted" });
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

        private bool isValidEmail(string email)
        {
            string pattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
            Regex regex = new Regex(pattern, RegexOptions.Compiled);
            return regex.IsMatch(email);
        }

        private string CheckPasswordStrength(string Password)
        {
            StringBuilder sb = new StringBuilder();
            if(Password.Length < 8)
               sb.Append("Password must be atleast 8 characters."+Environment.NewLine);

            if(!(Regex.IsMatch(Password, "[a-z]") && Regex.IsMatch(Password, "[A-Z]") && Regex.IsMatch(Password, "[0-9]")))
               sb.Append("Password must be Alpha Numeric."+ Environment.NewLine);
            if (!Regex.IsMatch(Password, "[<,>,!,$,@,$,£,€]"));
               
                 return sb.ToString();
            
        }


        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("id", user.Id.ToString()),
                new Claim("password", user.Password)

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

        [HttpPost("uploadPicture")]
        public async Task<IActionResult> UploadPicture(IFormFile file, int id)
        {
            // Perform validation on the file size, type, etc.

            // Generate a unique filename or use the user's ID
            var fileExtension = Path.GetExtension(file.FileName);
            
            var fileName = $"{id}{fileExtension}";

            // Save the file to the file server
            var filePath = Path.Combine("C:\\Users\\rjn\\Desktop\\profilepicture", fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Update the user's profile with the file path or URL in the database

            // Return a response with the file path or URL
            System.Diagnostics.Debug.Print("##################\n" + filePath+ "\n###############");
            return Ok(new { FilePath = filePath });
            
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
