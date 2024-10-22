using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_dotnet7.Migrations
{
    /// <inheritdoc />
    public partial class AddArtistTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArtistId",
                table: "ArtWorks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Artists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Biography = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArtStyle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfileImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artists", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArtWorks_ArtistId",
                table: "ArtWorks",
                column: "ArtistId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtWorks_Artists_ArtistId",
                table: "ArtWorks",
                column: "ArtistId",
                principalTable: "Artists",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtWorks_Artists_ArtistId",
                table: "ArtWorks");

            migrationBuilder.DropTable(
                name: "Artists");

            migrationBuilder.DropIndex(
                name: "IX_ArtWorks_ArtistId",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "ArtistId",
                table: "ArtWorks");
        }
    }
}
