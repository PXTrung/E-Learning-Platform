using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_LearningApi.Data.Migrations
{
    /// <inheritdoc />
    public partial class Add_Create_Update_Time_And_IsEdit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "ratings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsEdit",
                table: "ratings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "ratings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "ratings");

            migrationBuilder.DropColumn(
                name: "IsEdit",
                table: "ratings");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "ratings");
        }
    }
}
