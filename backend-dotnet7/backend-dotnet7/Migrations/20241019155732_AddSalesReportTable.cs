using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_dotnet7.Migrations
{
    /// <inheritdoc />
    public partial class AddSalesReportTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SalesReports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReportDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ArtworkId = table.Column<int>(type: "int", nullable: false),
                    ArtworkTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArtistName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuantitySold = table.Column<int>(type: "int", nullable: false),
                    TotalRevenue = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalesReports_ArtWorks_ArtworkId",
                        column: x => x.ArtworkId,
                        principalTable: "ArtWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VisitorStatistics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReportDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExhibitionId = table.Column<int>(type: "int", nullable: false),
                    ExhibitionTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalVisitors = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VisitorStatistics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VisitorStatistics_Exhibitions_ExhibitionId",
                        column: x => x.ExhibitionId,
                        principalTable: "Exhibitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SalesReports_ArtworkId",
                table: "SalesReports",
                column: "ArtworkId");

            migrationBuilder.CreateIndex(
                name: "IX_VisitorStatistics_ExhibitionId",
                table: "VisitorStatistics",
                column: "ExhibitionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SalesReports");

            migrationBuilder.DropTable(
                name: "VisitorStatistics");
        }
    }
}
