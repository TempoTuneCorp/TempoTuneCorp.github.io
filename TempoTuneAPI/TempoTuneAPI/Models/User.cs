using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace TempoTuneAPI.Models
{



        [Index(nameof(UserName), IsUnique = true)]
        [Index(nameof(Email), IsUnique = true)]


    public class User
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

<<<<<<< HEAD
        
=======
>>>>>>> master
        public string Email { get; set; }

        public string Password { get; set; }

        public string Token { get; set; }

    }
}
