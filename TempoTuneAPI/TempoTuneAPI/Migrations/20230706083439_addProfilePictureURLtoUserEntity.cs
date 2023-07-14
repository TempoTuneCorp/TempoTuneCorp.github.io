using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TempoTuneAPI.Migrations
{
    /// <inheritdoc />
    public partial class addProfilePictureURLtoUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "profilePictureURL",
                table: "users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "profilePictureURL",
                table: "users");
        }
    }
}
