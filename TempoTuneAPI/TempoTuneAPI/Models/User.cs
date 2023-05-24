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

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }



    }
}
