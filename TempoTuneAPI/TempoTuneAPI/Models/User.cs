using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace TempoTuneAPI.Models
{



        [Index(nameof(UserName), IsUnique = true)]
        [Index(nameof(Email), IsUnique = true)]


    public class User
    {
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
