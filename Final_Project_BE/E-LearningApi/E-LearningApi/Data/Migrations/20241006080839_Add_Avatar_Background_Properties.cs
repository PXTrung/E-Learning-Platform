using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_LearningApi.Data.Migrations
{
    /// <inheritdoc />
    public partial class Add_Avatar_Background_Properties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AvatarId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "BackgroundId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_AvatarId",
                table: "AspNetUsers",
                column: "AvatarId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_BackgroundId",
                table: "AspNetUsers",
                column: "BackgroundId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Media_AvatarId",
                table: "AspNetUsers",
                column: "AvatarId",
                principalTable: "Media",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Media_BackgroundId",
                table: "AspNetUsers",
                column: "BackgroundId",
                principalTable: "Media",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Media_AvatarId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Media_BackgroundId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_AvatarId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_BackgroundId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AvatarId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "BackgroundId",
                table: "AspNetUsers");
        }
    }
}
