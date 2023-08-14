using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TempoTuneAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddedSongUrl1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "URl",
                table: "Tracks",
                newName: "Url");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Tracks",
                newName: "URl");
        }
    }
}
