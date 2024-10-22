using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_dotnet7.Migrations
{
    /// <inheritdoc />
    public partial class AddArtCategoryTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArtCategoryId",
                table: "ArtWorks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ArtCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ArtworkReviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ArtworkId = table.Column<int>(type: "int", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtworkReviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArtworkReviews_ArtWorks_ArtworkId",
                        column: x => x.ArtworkId,
                        principalTable: "ArtWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArtWorks_ArtCategoryId",
                table: "ArtWorks",
                column: "ArtCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkReviews_ArtworkId",
                table: "ArtworkReviews",
                column: "ArtworkId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtWorks_ArtCategories_ArtCategoryId",
                table: "ArtWorks",
                column: "ArtCategoryId",
                principalTable: "ArtCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtWorks_ArtCategories_ArtCategoryId",
                table: "ArtWorks");

            migrationBuilder.DropTable(
                name: "ArtCategories");

            migrationBuilder.DropTable(
                name: "ArtworkReviews");

            migrationBuilder.DropIndex(
                name: "IX_ArtWorks_ArtCategoryId",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "ArtCategoryId",
                table: "ArtWorks");
        }
    }
}
