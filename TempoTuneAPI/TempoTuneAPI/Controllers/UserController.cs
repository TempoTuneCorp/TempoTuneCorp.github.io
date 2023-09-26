using System.Drawing;
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
using TempoTuneAPI.Services;

namespace TempoTuneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TempoTuneDbContext _context;
        private readonly EmailService _emailService;

        //Constructor
        public UserController(TempoTuneDbContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userObj.UserName);

            if (user == null)
                return NotFound(new { Message = "User not found" });

            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                return BadRequest(new { Message = "Password is incorrect" });
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
                return BadRequest(new { Message = "Username already exists" });

            //Check om Email eksisterer
            if (await CheckEmailExistsAsync(userObj.Email))
                return BadRequest(new { Message = "Email already exists" });

            //Check Password Strength
            var pass = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass.ToString() });

            if (!isValidEmail(userObj.Email))
                return BadRequest(new { Message = "Email must be right format: a1@b2.c3" });

            userObj.Password = PasswordHasher.HashPassword(userObj.Password);

            await _context.Users.AddAsync(userObj);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered"
            });

        }

        [HttpPost("SendEmailResetPassword")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SendEmailResetPassword(User UserObj)
        {
            if (await CheckEmailExistsAsync(UserObj.Email))
            {
                var user = _context.Users.FirstOrDefault(u => u.Email == UserObj.Email);
                string resetToken = Guid.NewGuid().ToString();
                user.ResetToken = resetToken;
                user.ResetTokenExpiryTime = DateTime.UtcNow.AddMinutes(10);
                _context.SaveChanges();
                string resetLink = $"http://192.168.23.122:8082/reset-password?resetToken={resetToken}";
                await _emailService.SendPasswordResetEmailAsync(UserObj.Email, resetLink);

                return Ok(new
                {
                    Message = $"An Email has been sent to {UserObj.Email}"
                });
            }
            else return BadRequest(new { Message = "Email doesn't exist in database" });
        }

        [HttpPost("ValidateUserToResetPassword")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ValidateUserToResetPassword(User UserObj)
        {
            if (UserObj == null)
               return NotFound(new { Message = "User not found" });

            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.ResetToken == UserObj.ResetToken);
                if (user == null)
                {
                    return BadRequest(new { Message = "Reset token has expired" });
                }

                if (user.ResetTokenExpiryTime <= DateTime.UtcNow)
                {
                return BadRequest(new { Message = "Reset token has expired" });
                }

            }
            catch (Exception)
            {
                throw;
               
            }

            return Ok(new { Message = $"update password for user" });
        }

        [HttpPut("updatePassword")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdatePassword(User UserObj)
        {

            var user = await _context.Users.FirstOrDefaultAsync(u => u.ResetToken == UserObj.ResetToken);
            
            var pass = CheckPasswordStrength(UserObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass.ToString() });


            UserObj.Password = PasswordHasher.HashPassword(UserObj.Password);
            user.Password = UserObj.Password;
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            user.Token = CreateJwt(user);
            return Ok(new
            {
                Message = "Password updated successfully"
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
            return await _context.Users.AnyAsync(x => x.UserName == username);
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
            if (Password.Length < 8)
                sb.Append("Password must be atleast 8 characters." + Environment.NewLine);

            if (!(Regex.IsMatch(Password, "[a-z]") && Regex.IsMatch(Password, "[A-Z]") && Regex.IsMatch(Password, "[0-9]")))
                sb.Append("Password must be Alpha Numeric." + Environment.NewLine);
            if (!Regex.IsMatch(Password, "[<,>,!,$,@,$,£,€]")) ;

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

        [HttpPost("uploadProfilePicture/{id}")]
        public async Task<IActionResult> UploadPicture(IFormFile picture, int id)
        {
            User user = await _context.Users.FindAsync(id);
            if (picture != null && picture.Length > 0)
            {
                if (picture.Length > 400 * 1024) // Check if the file size is more than 400 KB
                {
                    // File size is too large, return a warning
                    return BadRequest(new { Message = "The picture exceeds the maximum file size of 400KB" });
                }

                using (var memoryStream = new MemoryStream())
                {
                    await picture.CopyToAsync(memoryStream);
                    var imageBytes = memoryStream.ToArray();

                    // Convert the image bytes to base64 string
                    var base64String = Convert.ToBase64String(imageBytes);

                    // Save the base64 string to the database
                    user.profilePictureURL = base64String;
                    _context.Entry(user).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }


                return Ok();
            }
            // No file was provided, return an error
            return BadRequest("No profile picture file was uploaded.");
        }

        
        [HttpGet("getPictureUrl/{id}")]
        public async Task<ActionResult> GetPictureUrl(int id)
        {
        User user = await _context.Users.FindAsync(id);

        string pictureUrl = user.profilePictureURL;

            //byte[] bytes = Convert.FromBase64String(pictureUrl);

            //Image image;
            //using (MemoryStream ms = new MemoryStream(bytes))
            //{
            //    image = Image.FromStream(ms);
            //}

            return Ok(pictureUrl);
        }
    }
}
