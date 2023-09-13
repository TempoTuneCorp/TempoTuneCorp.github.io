using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TempoTuneAPI.Migrations
{
    /// <inheritdoc />
    public partial class timetrack : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Time",
                table: "Tracks",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "Tracks");
        }
    }
}
